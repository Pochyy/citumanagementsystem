package com.example.ojtmanagementsystem.dto;

public class RequirementResponse {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String uploadedDate;
    private String fileSize;

    public RequirementResponse() {}

    public RequirementResponse(Long id, String title, String description, String status, String uploadedDate, String fileSize) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.uploadedDate = uploadedDate;
        this.fileSize = fileSize;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getUploadedDate() { return uploadedDate; }
    public void setUploadedDate(String uploadedDate) { this.uploadedDate = uploadedDate; }
    public String getFileSize() { return fileSize; }
    public void setFileSize(String fileSize) { this.fileSize = fileSize; }
}