package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * An internship posting created by a Company.
 * - Created via the "Post internship" form (position, department, slots,
 *   duration, dates, description, skills, work setup).
 * - status defaults to "Open" and postedDate is set automatically on creation.
 * - applicationsCount is maintained by the application flow (not set by the
 *   company when posting) and starts at 0.
 */
@Entity
@Table(name = "internships")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "position_title", nullable = false)
    private String positionTitle;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "available_slots", nullable = false)
    private Integer availableSlots;

    @Column(name = "duration", nullable = false)
    private String duration;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "application_deadline", nullable = false)
    private LocalDate applicationDeadline;

    @Column(name = "job_description", length = 1000, nullable = false)
    private String jobDescription;

    @ElementCollection
    @CollectionTable(
            name = "internship_skills",
            joinColumns = @JoinColumn(name = "internship_id")
    )
    @Column(name = "skill", nullable = false)
    private List<String> requiredSkills = new ArrayList<>();

    @Column(name = "work_setup", nullable = false)
    private String workSetup;

    @Column(name = "status", nullable = false)
    private String status = "Open";

    @Column(name = "posted_date", nullable = false, updatable = false)
    private LocalDate postedDate;

    @Column(name = "applications_count", nullable = false)
    private Integer applicationsCount = 0;

    @PrePersist
    protected void onCreate() {
        this.postedDate = LocalDate.now();
        if (this.status == null || this.status.isBlank()) {
            this.status = "Open";
        }
        if (this.applicationsCount == null) {
            this.applicationsCount = 0;
        }
    }

    public Internship() {
    }

    // ---- Getters & Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public Integer getApplicationsCount() {
        return applicationsCount;
    }

    public void setApplicationsCount(Integer applicationsCount) {
        this.applicationsCount = applicationsCount;
    }
}
