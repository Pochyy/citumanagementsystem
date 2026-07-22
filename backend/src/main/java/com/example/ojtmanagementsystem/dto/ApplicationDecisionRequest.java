package com.example.ojtmanagementsystem.dto;

public class ApplicationDecisionRequest {
    private String status; // "Accepted" or "Shortlisted"
    private String notes;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
