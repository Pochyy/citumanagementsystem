package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.ApplicationResponse;
import com.example.ojtmanagementsystem.dto.StudentApplicationResponse;
import com.example.ojtmanagementsystem.entity.Application;
import com.example.ojtmanagementsystem.entity.Internship;
import com.example.ojtmanagementsystem.entity.NotificationType;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.repository.ApplicationRepository;
import com.example.ojtmanagementsystem.repository.InternshipRepository;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private static final String ACCEPTED_STATUS = "Accepted";

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;
    private final NotificationService notificationService;

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);

    private static final DateTimeFormatter FULL_DATE_FMT =
            DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);

    public ApplicationService(ApplicationRepository applicationRepository,
                               StudentRepository studentRepository,
                               InternshipRepository internshipRepository,
                               NotificationService notificationService) {
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
        this.notificationService = notificationService;
    }

    public List<ApplicationResponse> getAll() {
        return applicationRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ApplicationResponse getActiveApplicationForStudent(String studentId) {
        Application app = applicationRepository
                .findByStudent_StudentIdAndStatus(studentId, ACCEPTED_STATUS)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No active (accepted) internship application found for student " + studentId));
        return toResponse(app);
    }

    public List<ApplicationResponse> getAllForStudent(String studentId) {
        return applicationRepository.findByStudent_StudentId(studentId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getAllForCompany(Long companyId) {
        return applicationRepository.findByInternship_Company_Id(companyId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<StudentApplicationResponse> getMyApplications(String studentId) {
        return applicationRepository.findByStudent_StudentId(studentId).stream()
                .map(this::toStudentResponse)
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
        Application saved = applicationRepository.save(app);

        Student student = saved.getStudent();
        if (student != null && student.getUser() != null) {
            String positionTitle = saved.getInternship() != null
                    ? saved.getInternship().getPositionTitle()
                    : "your application";

            notificationService.create(
                    student.getUser().getUserId(),
                    NotificationType.APPLICATION_STATUS_UPDATE,
                    "Application " + status,
                    "Your application for " + positionTitle + " is now " + status + ".",
                    saved.getId()
            );
        }

        return toResponse(saved);
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

        Application saved = applicationRepository.save(app);

        if (internship.getCompany() != null && internship.getCompany().getUser() != null) {
            String applicantName = "A student";
            if (student.getUser() != null) {
                String first = student.getUser().getFirstName();
                String last = student.getUser().getLastName();
                String fullName = ((first != null ? first : "") + " " + (last != null ? last : "")).trim();
                if (!fullName.isEmpty()) {
                    applicantName = fullName;
                }
            }

            notificationService.create(
                    internship.getCompany().getUser().getUserId(),
                    NotificationType.NEW_APPLICANT,
                    "New applicant — " + applicantName,
                    "Applied for " + internship.getPositionTitle(),
                    saved.getId()
            );
        }

        return toResponse(saved);
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

    private StudentApplicationResponse toStudentResponse(Application app) {
        StudentApplicationResponse res = new StudentApplicationResponse();
        res.setId(app.getId());
        res.setApplicationStatus(app.getStatus());
        res.setProgressPercent(deriveProgressPercent(app.getStatus()));

        if (app.getAppliedDate() != null) {
            res.setAppliedDate(app.getAppliedDate().format(FULL_DATE_FMT));
        }
        if (app.getLastUpdatedDate() != null) {
            res.setLastUpdatedDate(app.getLastUpdatedDate().toLocalDate().format(FULL_DATE_FMT));
        }

        Internship internship = app.getInternship();
        if (internship != null) {
            res.setPositionTitle(internship.getPositionTitle());
            res.setDepartment(internship.getDepartment());
            res.setAvailableSlots(internship.getAvailableSlots());
            res.setDuration(internship.getDuration());
            res.setWorkSetup(internship.getWorkSetup());
            res.setJobDescription(internship.getJobDescription());
            res.setRequiredSkills(internship.getRequiredSkills());

            if (internship.getStartDate() != null) {
                res.setStartDate(internship.getStartDate().format(FULL_DATE_FMT));
            }
            if (internship.getApplicationDeadline() != null) {
                res.setApplicationDeadline(internship.getApplicationDeadline().format(FULL_DATE_FMT));
            }

            if (internship.getCompany() != null) {
                res.setCompanyName(internship.getCompany().getCompanyName());
            }
        }

        return res;
    }

    private int deriveProgressPercent(String status) {
        if (status == null) return 0;
        return switch (status) {
            case "Pending" -> 25;
            case "Shortlisted" -> 60;
            case "Accepted" -> 100;
            default -> 0;
        };
    }
}