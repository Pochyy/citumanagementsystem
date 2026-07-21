package com.example.ojtmanagementsystem.dto;

import com.example.ojtmanagementsystem.entity.Internship;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Shaped to match what InternshipList.jsx / InternshipListings.jsx expect:
 * position, department, slots, applications, status, postedDate (e.g. "Mar 1, 2025").
 */
public class InternshipResponse {

    private static final DateTimeFormatter DISPLAY_DATE =
            DateTimeFormatter.ofPattern("MMM d, yyyy");

    private Long id;
    private Long companyId;
    private String companyName;

    private String position;      // maps from positionTitle
    private String department;
    private Integer slots;        // maps from availableSlots
    private Integer applications; // maps from applicationsCount
    private String status;
    private String postedDate;    // formatted, e.g. "Mar 1, 2025"

    private String duration;
    private LocalDate startDate;
    private LocalDate applicationDeadline;
    private String jobDescription;
    private List<String> requiredSkills;
    private String workSetup;

    public static InternshipResponse from(Internship internship) {
        InternshipResponse dto = new InternshipResponse();
        dto.id = internship.getId();
        dto.companyId = internship.getCompany() != null ? internship.getCompany().getId() : null;
        dto.companyName = internship.getCompany() != null ? internship.getCompany().getCompanyName() : null;

        dto.position = internship.getPositionTitle();
        dto.department = internship.getDepartment();
        dto.slots = internship.getAvailableSlots();
        dto.applications = internship.getApplicationsCount();
        dto.status = internship.getStatus();
        dto.postedDate = internship.getPostedDate() != null
                ? internship.getPostedDate().format(DISPLAY_DATE)
                : null;

        dto.duration = internship.getDuration();
        dto.startDate = internship.getStartDate();
        dto.applicationDeadline = internship.getApplicationDeadline();
        dto.jobDescription = internship.getJobDescription();
        dto.requiredSkills = internship.getRequiredSkills();
        dto.workSetup = internship.getWorkSetup();
        return dto;
    }

    // ---- Getters & Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getSlots() {
        return slots;
    }

    public void setSlots(Integer slots) {
        this.slots = slots;
    }

    public Integer getApplications() {
        return applications;
    }

    public void setApplications(Integer applications) {
        this.applications = applications;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
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
