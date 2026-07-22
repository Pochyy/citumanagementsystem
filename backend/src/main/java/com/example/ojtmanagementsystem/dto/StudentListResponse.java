package com.example.ojtmanagementsystem.dto;

/**
 * DTO for listing students in the Coordinator's Student Management page.
 * Joins data from STUDENT + USER + INTERNSHIP PROGRESS + COMPANY.
 */
public class StudentListResponse {
    private Long studentId;
    private Long applicationId;
    private String studentNumber;
    private String firstName;
    private String lastName;
    private String course;
    private Integer yearLevel;
    private String companyName;
    private String progressStatus;
    private Integer hoursCompleted;
    private Integer requiredHours;
    private String email;
    private String contactNumber;

    public StudentListResponse() {}

    public StudentListResponse(Long studentId, Long applicationId, String studentNumber,
                                String firstName, String lastName, String course,
                                Integer yearLevel, String companyName, String progressStatus,
                                Integer hoursCompleted, Integer requiredHours,
                                String email, String contactNumber) {
        this.studentId = studentId;
        this.applicationId = applicationId;
        this.studentNumber = studentNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.course = course;
        this.yearLevel = yearLevel;
        this.companyName = companyName;
        this.progressStatus = progressStatus;
        this.hoursCompleted = hoursCompleted;
        this.requiredHours = requiredHours;
        this.email = email;
        this.contactNumber = contactNumber;
    }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public String getStudentNumber() { return studentNumber; }
    public void setStudentNumber(String studentNumber) { this.studentNumber = studentNumber; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public Integer getYearLevel() { return yearLevel; }
    public void setYearLevel(Integer yearLevel) { this.yearLevel = yearLevel; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getProgressStatus() { return progressStatus; }
    public void setProgressStatus(String progressStatus) { this.progressStatus = progressStatus; }

    public Integer getHoursCompleted() { return hoursCompleted; }
    public void setHoursCompleted(Integer hoursCompleted) { this.hoursCompleted = hoursCompleted; }

    public Integer getRequiredHours() { return requiredHours; }
    public void setRequiredHours(Integer requiredHours) { this.requiredHours = requiredHours; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}