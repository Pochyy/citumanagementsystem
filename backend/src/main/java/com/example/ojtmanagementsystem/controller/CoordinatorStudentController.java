package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.StudentListResponse;
import com.example.ojtmanagementsystem.entity.Application;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.repository.ApplicationRepository;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Coordinator-specific endpoints for student management.
 * - GET /api/coordinator/students — list all students with their OJT info
 */
@RestController
@RequestMapping("/api/coordinator/students")
@CrossOrigin(origins = "http://localhost:3000")
public class CoordinatorStudentController {

    private final StudentRepository studentRepository;
    private final ApplicationRepository applicationRepository;

    public CoordinatorStudentController(StudentRepository studentRepository, ApplicationRepository applicationRepository) {
        this.studentRepository = studentRepository;
        this.applicationRepository = applicationRepository;
    }

    /**
     * GET /api/coordinator/students
     * Returns all students with their profile and OJT information.
     * Maps STUDENT + USER fields into the expected frontend shape.
     */
    @GetMapping
    public ResponseEntity<List<StudentListResponse>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<StudentListResponse> response = students.stream().map(s -> {
            StudentListResponse dto = new StudentListResponse();
            dto.setStudentId(s.getStudentId());
            dto.setApplicationId(0L); // Would need a join
            dto.setStudentNumber(s.getStudentId());
            dto.setFirstName(s.getUser().getFirstName() != null ? s.getUser().getFirstName() : "");
            dto.setLastName(s.getUser().getLastName() != null ? s.getUser().getLastName() : "");
            dto.setCourse(s.getProgram() != null ? s.getProgram() : "");
            dto.setYearLevel(s.getYearLevel() != null ? Integer.parseInt(s.getYearLevel()) : 0);
            
            // Get the most recent application for this student
            List<Application> applications = applicationRepository.findByStudent_StudentIdOrderByIdDesc(s.getStudentId());
            if (!applications.isEmpty()) {
                Application latestApp = applications.get(0);
                if (latestApp.getInternship() != null && latestApp.getInternship().getCompany() != null) {
                    dto.setCompanyName(latestApp.getInternship().getCompany().getCompanyName());
                } else {
                    dto.setCompanyName("");
                }
                dto.setProgressStatus(latestApp.getStatus() != null ? latestApp.getStatus() : "");
                dto.setApplicationId(latestApp.getId());
            } else {
                dto.setCompanyName("");
                dto.setProgressStatus("");
                dto.setApplicationId(0L);
            }
            dto.setHoursCompleted(0);
            dto.setRequiredHours(0);
            dto.setEmail(s.getUser().getEmail() != null ? s.getUser().getEmail() : "");
            dto.setContactNumber(s.getPhoneNumber() != null ? s.getPhoneNumber() : "");
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}