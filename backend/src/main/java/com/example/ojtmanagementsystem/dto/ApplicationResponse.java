package com.example.ojtmanagementsystem.dto;

import java.time.LocalDate;

public class ApplicationResponse {
    private Long id;
    private String name;
    private String appliedDate;
    private String appliedFor;
    private String course;
    private String school;
    private String status;
    private String email;
    private String phone;
    private String notes;
    private String coverLetter;
    private LocalDate shortlistedOn;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }
    public String getAppliedFor() { return appliedFor; }
    public void setAppliedFor(String appliedFor) { this.appliedFor = appliedFor; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
    public LocalDate getShortlistedOn() { return shortlistedOn; }
    public void setShortlistedOn(LocalDate shortlistedOn) { this.shortlistedOn = shortlistedOn; }
}
