package com.example.ojtmanagementsystem.dto;

/**
 * Request body for updating a company's verification status.
 */
public class VerificationUpdateRequest {
    private String verificationStatus;

    public VerificationUpdateRequest() {}

    public VerificationUpdateRequest(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
}