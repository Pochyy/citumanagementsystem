package com.example.ojtmanagementsystem.dto;

/**
 * Response shape for GET /api/attendance/summary?applicationId=
 * Backs the four stat cards + monthly hours progress bar on
 * Attendancepage.jsx.
 */
public class AttendanceSummaryResponse {
    private int totalDays;
    private int daysPresent;
    private int daysAbsent;
    private double attendanceRate; // e.g. 90.0 -> displayed as "90.0%"

    private double hoursCompleted;
    private double hoursTarget;

    public AttendanceSummaryResponse() {}

    public AttendanceSummaryResponse(int totalDays, int daysPresent, int daysAbsent,
                                      double attendanceRate, double hoursCompleted, double hoursTarget) {
        this.totalDays = totalDays;
        this.daysPresent = daysPresent;
        this.daysAbsent = daysAbsent;
        this.attendanceRate = attendanceRate;
        this.hoursCompleted = hoursCompleted;
        this.hoursTarget = hoursTarget;
    }

    public int getTotalDays() { return totalDays; }
    public void setTotalDays(int totalDays) { this.totalDays = totalDays; }

    public int getDaysPresent() { return daysPresent; }
    public void setDaysPresent(int daysPresent) { this.daysPresent = daysPresent; }

    public int getDaysAbsent() { return daysAbsent; }
    public void setDaysAbsent(int daysAbsent) { this.daysAbsent = daysAbsent; }

    public double getAttendanceRate() { return attendanceRate; }
    public void setAttendanceRate(double attendanceRate) { this.attendanceRate = attendanceRate; }

    public double getHoursCompleted() { return hoursCompleted; }
    public void setHoursCompleted(double hoursCompleted) { this.hoursCompleted = hoursCompleted; }

    public double getHoursTarget() { return hoursTarget; }
    public void setHoursTarget(double hoursTarget) { this.hoursTarget = hoursTarget; }
}