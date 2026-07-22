package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.AttendanceActionRequest;
import com.example.ojtmanagementsystem.dto.AttendanceRecentRecordResponse;
import com.example.ojtmanagementsystem.dto.AttendanceSummaryResponse;
import com.example.ojtmanagementsystem.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    /**
     * GET /api/attendance?from=2026-07-13&to=2026-07-17
     * Returns attendance records grouped by application for the given date
     * range. Used by the coordinator's Progress Monitoring screen.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAttendance(
            @RequestParam("from") String from,
            @RequestParam("to") String to) {
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate = LocalDate.parse(to);
        return ResponseEntity.ok(attendanceService.getAttendanceByDateRange(fromDate, toDate));
    }

    /**
     * GET /api/attendance/summary?applicationId=123
     * Powers the four stat cards + monthly hours progress bar on
     * Attendancepage.jsx.
     */
    @GetMapping("/summary")
    public ResponseEntity<AttendanceSummaryResponse> getSummary(
            @RequestParam("applicationId") Long applicationId) {
        return ResponseEntity.ok(attendanceService.getSummaryForApplication(applicationId));
    }

    /**
     * GET /api/attendance/recent?applicationId=123&limit=4
     * Powers the "Recent Attendance Record" table on Attendancepage.jsx.
     */
    @GetMapping("/recent")
    public ResponseEntity<List<AttendanceRecentRecordResponse>> getRecent(
            @RequestParam("applicationId") Long applicationId,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        return ResponseEntity.ok(attendanceService.getRecentRecordsForApplication(applicationId, limit));
    }

    /**
     * POST /api/attendance/time-in   { "applicationId": 123 }
     */
    @PostMapping("/time-in")
    public ResponseEntity<AttendanceRecentRecordResponse> timeIn(
            @RequestBody AttendanceActionRequest request) {
        return ResponseEntity.ok(attendanceService.recordTimeIn(request.getApplicationId()));
    }

    /**
     * POST /api/attendance/time-out  { "applicationId": 123 }
     */
    @PostMapping("/time-out")
    public ResponseEntity<AttendanceRecentRecordResponse> timeOut(
            @RequestBody AttendanceActionRequest request) {
        return ResponseEntity.ok(attendanceService.recordTimeOut(request.getApplicationId()));
    }
}