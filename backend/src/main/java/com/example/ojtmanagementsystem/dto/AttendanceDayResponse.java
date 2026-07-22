package com.example.ojtmanagementsystem.dto;

/**
 * Represents a single day's attendance with formatted time strings.
 * If absent, this object is null in the parent map.
 */
public class AttendanceDayResponse {
    private String timeIn;
    private String timeOut;

    public AttendanceDayResponse() {}

    public AttendanceDayResponse(String timeIn, String timeOut) {
        this.timeIn = timeIn;
        this.timeOut = timeOut;
    }

    public String getTimeIn() { return timeIn; }
    public void setTimeIn(String timeIn) { this.timeIn = timeIn; }

    public String getTimeOut() { return timeOut; }
    public void setTimeOut(String timeOut) { this.timeOut = timeOut; }
}