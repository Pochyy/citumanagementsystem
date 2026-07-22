package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
     * Returns attendance records grouped by application for the given date range.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAttendance(
            @RequestParam("from") String from,
            @RequestParam("to") String to) {
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate = LocalDate.parse(to);
        return ResponseEntity.ok(attendanceService.getAttendanceByDateRange(fromDate, toDate));
    }
}