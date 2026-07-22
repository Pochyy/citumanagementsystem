package com.example.ojtmanagementsystem.dto;

/**
 * Request body for POST /api/attendance/time-in and /time-out.
 */
public class AttendanceActionRequest {
    private Long applicationId;

    public AttendanceActionRequest() {}

    public AttendanceActionRequest(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
}