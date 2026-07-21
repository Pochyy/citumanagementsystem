package com.example.ojtmanagementsystem.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * Matches the "Post internship" form fields:
 * positionTitle, department, availableSlots, duration, startDate,
 * applicationDeadline, jobDescription, requiredSkills, workSetup.
 */
public class CreateInternshipRequest {

    private String positionTitle;
    private String department;
    private Integer availableSlots;
    private String duration;
    private LocalDate startDate;
    private LocalDate applicationDeadline;
    private String jobDescription;
    private List<String> requiredSkills;
    private String workSetup;

    public CreateInternshipRequest() {
    }

    public String getPositionTitle() {
        return positionTitle;
    }

    public void setPositionTitle(String positionTitle) {
        this.positionTitle = positionTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(Integer availableSlots) {
        this.availableSlots = availableSlots;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(LocalDate applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public String getWorkSetup() {
        return workSetup;
    }

    public void setWorkSetup(String workSetup) {
        this.workSetup = workSetup;
    }
}
