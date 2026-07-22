package com.example.ojtmanagementsystem.dto;

/**
 * Response shape for GET /api/attendance/recent?applicationId=
 * One flat row per day, matching recentRecords in Attendancepage.jsx
 * (as opposed to AttendanceRecordResponse, which is the multi-student,
 * date-keyed-map shape used by the coordinator's Progress Monitoring view).
 */
public class AttendanceRecentRecordResponse {
    private Long attendanceId;
    private String dateRecord;   // e.g. "June 29, 2026"
    private String timeIn;       // e.g. "08:00 AM", or null
    private String timeOut;      // e.g. "05:00 PM", or null
    private Double hoursWorked;  // null if absent
    private String status;      // "Present" | "Absent" | "Late"

    public AttendanceRecentRecordResponse() {}

    public AttendanceRecentRecordResponse(Long attendanceId, String dateRecord, String timeIn,
                                           String timeOut, Double hoursWorked, String status) {
        this.attendanceId = attendanceId;
        this.dateRecord = dateRecord;
        this.timeIn = timeIn;
        this.timeOut = timeOut;
        this.hoursWorked = hoursWorked;
        this.status = status;
    }

    public Long getAttendanceId() { return attendanceId; }
    public void setAttendanceId(Long attendanceId) { this.attendanceId = attendanceId; }

    public String getDateRecord() { return dateRecord; }
    public void setDateRecord(String dateRecord) { this.dateRecord = dateRecord; }

    public String getTimeIn() { return timeIn; }
    public void setTimeIn(String timeIn) { this.timeIn = timeIn; }

    public String getTimeOut() { return timeOut; }
    public void setTimeOut(String timeOut) { this.timeOut = timeOut; }

    public Double getHoursWorked() { return hoursWorked; }
    public void setHoursWorked(Double hoursWorked) { this.hoursWorked = hoursWorked; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}