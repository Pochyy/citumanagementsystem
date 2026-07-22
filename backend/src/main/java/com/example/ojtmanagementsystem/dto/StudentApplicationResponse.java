package com.example.ojtmanagementsystem.dto;

import java.util.List;

/**
 * Response shape for GET /api/applications/student/{studentId}/details
 * Backs the "My Applications" tracking page (MyInternshipPage.jsx /
 * InternshipList.jsx) - a join of Application + Internship + Company
 * fields, flattened into what the student-facing UI actually displays.
 */
public class StudentApplicationResponse {
    private Long id;
    private String positionTitle;
    private String companyName;
    private String department;
    private String appliedDate;       // formatted, e.g. "June 25, 2026"
    private String lastUpdatedDate;   // formatted, e.g. "June 27, 2026"
    private String applicationStatus; // "Pending" | "Shortlisted" | "Accepted"
    private int progressPercent;      // derived from applicationStatus

    private Integer availableSlots;
    private String duration;
    private String startDate;             // formatted
    private String applicationDeadline;   // formatted
    private String workSetup;
    private String jobDescription;
    private List<String> requiredSkills;

    public StudentApplicationResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPositionTitle() { return positionTitle; }
    public void setPositionTitle(String positionTitle) { this.positionTitle = positionTitle; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }

    public String getLastUpdatedDate() { return lastUpdatedDate; }
    public void setLastUpdatedDate(String lastUpdatedDate) { this.lastUpdatedDate = lastUpdatedDate; }

    public String getApplicationStatus() { return applicationStatus; }
    public void setApplicationStatus(String applicationStatus) { this.applicationStatus = applicationStatus; }

    public int getProgressPercent() { return progressPercent; }
    public void setProgressPercent(int progressPercent) { this.progressPercent = progressPercent; }

    public Integer getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(Integer availableSlots) { this.availableSlots = availableSlots; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getApplicationDeadline() { return applicationDeadline; }
    public void setApplicationDeadline(String applicationDeadline) { this.applicationDeadline = applicationDeadline; }

    public String getWorkSetup() { return workSetup; }
    public void setWorkSetup(String workSetup) { this.workSetup = workSetup; }

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}