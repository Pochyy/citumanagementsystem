package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.ApplicationResponse;
import com.example.ojtmanagementsystem.entity.Application;
import com.example.ojtmanagementsystem.entity.Internship;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.repository.ApplicationRepository;
import com.example.ojtmanagementsystem.repository.InternshipRepository;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);

    public ApplicationService(ApplicationRepository applicationRepository,
                               StudentRepository studentRepository,
                               InternshipRepository internshipRepository) {
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
    }

    public List<ApplicationResponse> getAll() {
        return applicationRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ApplicationResponse updateStatus(Long id, String status, String notes) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        app.setNotes(notes);
        if (app.getShortlistedOn() == null) {
            app.setShortlistedOn(LocalDate.now());
        }
        return toResponse(applicationRepository.save(app));
    }

    public void reject(Long id) {
        applicationRepository.deleteById(id);
    }

    public ApplicationResponse submit(String studentId, Long internshipId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        Application app = new Application();
        app.setStudent(student);
        app.setInternship(internship);
        app.setStatus("Pending");
        app.setAppliedDate(LocalDate.now());

        return toResponse(applicationRepository.save(app));
    }

    private ApplicationResponse toResponse(Application app) {
        ApplicationResponse res = new ApplicationResponse();
        res.setId(app.getId());
        res.setStatus(app.getStatus());
        res.setNotes(app.getNotes());
        res.setCoverLetter(app.getCoverLetter());
        res.setShortlistedOn(app.getShortlistedOn());
        res.setAppliedDate("Applied " + app.getAppliedDate().format(DATE_FMT));

        Student s = app.getStudent();
        if (s != null) {
            // Student itself has no name/email - those live on the linked User.
            // Assumes User has getFullName() and getEmail(); adjust if the
            // actual method names differ.
            if (s.getUser() != null) {
                String first = s.getUser().getFirstName();
                String last = s.getUser().getLastName();
                String fullName = ((first != null ? first : "") + " " + (last != null ? last : "")).trim();
                res.setName(fullName.isEmpty() ? "Student Applicant" : fullName);
                res.setEmail(s.getUser().getEmail());
            }
            res.setCourse(s.getProgram());
            res.setSchool(s.getDepartment());
            res.setPhone(s.getPhoneNumber());
        }

        Internship i = app.getInternship();
        if (i != null) {
            res.setAppliedFor(i.getPositionTitle());
        }

        return res;
    }
}