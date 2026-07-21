package com.example.ojtmanagementsystem.dto;

import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

/** Combined User + Student view for the Student Profile page. */
public class StudentProfileResponse {
    private String studentId;
    private Long userId;
    private String fullName;
    private String email;
    private String status;
    private LocalDateTime dateCreated;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String program;
    private String yearLevel;
    private String department;

    public static StudentProfileResponse fromEntity(Student student) {
        User user = student.getUser();
        StudentProfileResponse dto = new StudentProfileResponse();
        dto.studentId = student.getStudentId();
        dto.userId = user.getUserId();
        dto.fullName = user.getFirstName() + " " + user.getLastName();
        dto.email = user.getEmail();
        dto.status = user.getStatus() != null ? user.getStatus().toString() : null;
        dto.dateCreated = user.getDateCreated();
        dto.phoneNumber = student.getPhoneNumber();
        dto.dateOfBirth = student.getDateOfBirth();
        dto.address = student.getAddress();
        dto.program = student.getProgram();
        dto.yearLevel = student.getYearLevel();
        dto.department = student.getDepartment();
        return dto;
    }

    public String getStudentId() { return studentId; }
    public Long getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getStatus() { return status; }
    public LocalDateTime getDateCreated() { return dateCreated; }
    public String getPhoneNumber() { return phoneNumber; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public String getAddress() { return address; }
    public String getProgram() { return program; }
    public String getYearLevel() { return yearLevel; }
    public String getDepartment() { return department; }
}