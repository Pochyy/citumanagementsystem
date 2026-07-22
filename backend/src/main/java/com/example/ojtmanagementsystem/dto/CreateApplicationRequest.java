package com.example.ojtmanagementsystem.dto;

public class CreateApplicationRequest {
    private String studentId;
    private Long internshipId;

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public Long getInternshipId() { return internshipId; }
    public void setInternshipId(Long internshipId) { this.internshipId = internshipId; }
}
