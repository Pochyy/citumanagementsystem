package com.example.ojtmanagementsystem.dto;

import java.util.Map;

/**
 * Response shape for the attendance endpoint.
 * Each record represents one student's attendance for a work week.
 */
public class AttendanceRecordResponse {
    private Long applicationId;
    private String studentNumber;
    private String name;
    /**
     * Map of date -> attendance detail (timeIn/timeOut) or null if absent.
     * e.g. { "2026-07-13": { "timeIn": "08:02 AM", "timeOut": "05:01 PM" }, "2026-07-14": null }
     */
    private Map<String, AttendanceDayResponse> attendance;

    public AttendanceRecordResponse() {}

    public AttendanceRecordResponse(Long applicationId, String studentNumber, String name, Map<String, AttendanceDayResponse> attendance) {
        this.applicationId = applicationId;
        this.studentNumber = studentNumber;
        this.name = name;
        this.attendance = attendance;
    }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public String getStudentNumber() { return studentNumber; }
    public void setStudentNumber(String studentNumber) { this.studentNumber = studentNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Map<String, AttendanceDayResponse> getAttendance() { return attendance; }
    public void setAttendance(Map<String, AttendanceDayResponse> attendance) { this.attendance = attendance; }
}