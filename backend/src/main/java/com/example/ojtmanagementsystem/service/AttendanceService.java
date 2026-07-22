package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.AttendanceDayResponse;
import com.example.ojtmanagementsystem.dto.AttendanceRecentRecordResponse;
import com.example.ojtmanagementsystem.dto.AttendanceRecordResponse;
import com.example.ojtmanagementsystem.dto.AttendanceSummaryResponse;
import com.example.ojtmanagementsystem.entity.Attendance;
import com.example.ojtmanagementsystem.repository.AttendanceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    // TODO(confirm-with-product): there is currently no field anywhere in the
    // schema for "required OJT hours" — Internship.duration is a free-text
    // string (e.g. "3 months"), not a number. Using a fixed constant here as
    // a placeholder. Replace with Internship.requiredHours (or similar) once
    // that's added, and pass it through Application -> here instead.
    private static final double DEFAULT_HOURS_TARGET = 486.0;

    // A day counts as "Late" if the recorded time-in is after this cutoff.
    private static final LocalTime LATE_CUTOFF = LocalTime.of(9, 0);

    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofPattern("hh:mm a");
    private static final DateTimeFormatter DATE_KEY_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter DATE_DISPLAY_FMT = DateTimeFormatter.ofPattern("MMMM d, yyyy");

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    // -------------------------------------------------------------------
    // EXISTING: multi-student, date-range view (Progress Monitoring screen)
    // -------------------------------------------------------------------
    public Map<String, Object> getAttendanceByDateRange(LocalDate from, LocalDate to) {
        List<Attendance> records = attendanceRepository.findByDateBetween(from, to);

        Map<Long, List<Attendance>> grouped = records.stream()
                .collect(Collectors.groupingBy(Attendance::getApplicationId));

        List<AttendanceRecordResponse> responseRecords = new ArrayList<>();

        for (Map.Entry<Long, List<Attendance>> entry : grouped.entrySet()) {
            Long applicationId = entry.getKey();
            List<Attendance> appRecords = entry.getValue();

            Map<String, AttendanceDayResponse> attendanceMap = new HashMap<>();
            LocalDate current = from;
            while (!current.isAfter(to)) {
                attendanceMap.put(current.format(DATE_KEY_FMT), null);
                current = current.plusDays(1);
            }

            for (Attendance att : appRecords) {
                String dateKey = att.getDate().format(DATE_KEY_FMT);
                String timeIn = att.getTimeIn() != null ? att.getTimeIn().format(TIME_FMT) : null;
                String timeOut = att.getTimeOut() != null ? att.getTimeOut().format(TIME_FMT) : null;
                attendanceMap.put(dateKey, new AttendanceDayResponse(timeIn, timeOut));
            }

            responseRecords.add(new AttendanceRecordResponse(
                    applicationId,
                    "",  // studentNumber — would need a join to get this
                    "",  // name — would need a join
                    attendanceMap
            ));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("weekLabel", "Week of " + from.toString() + " to " + to.toString());
        result.put("records", responseRecords);
        return result;
    }

    // -------------------------------------------------------------------
    // NEW: single-student summary stats + monthly hours progress
    // -------------------------------------------------------------------
    public AttendanceSummaryResponse getSummaryForApplication(Long applicationId) {
        LocalDate today = LocalDate.now();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = today.withDayOfMonth(today.lengthOfMonth());

        List<Attendance> monthRecords = attendanceRepository
                .findByApplicationIdAndDateBetween(applicationId, monthStart, monthEnd);

        int totalDays = monthRecords.size();
        int daysPresent = 0;
        int daysAbsent = 0;
        double hoursCompleted = 0.0;

        for (Attendance att : monthRecords) {
            String status = deriveStatus(att);
            if ("Absent".equals(status)) {
                daysAbsent++;
            } else {
                daysPresent++;
                hoursCompleted += computeHoursWorked(att);
            }
        }

        double attendanceRate = totalDays == 0 ? 0.0 : (daysPresent * 100.0) / totalDays;
        // Round to 1 decimal place
        attendanceRate = Math.round(attendanceRate * 10.0) / 10.0;
        hoursCompleted = Math.round(hoursCompleted * 10.0) / 10.0;

        return new AttendanceSummaryResponse(
                totalDays, daysPresent, daysAbsent, attendanceRate,
                hoursCompleted, DEFAULT_HOURS_TARGET
        );
    }

    // -------------------------------------------------------------------
    // NEW: single-student recent records (flat list, most recent first)
    // -------------------------------------------------------------------
    public List<AttendanceRecentRecordResponse> getRecentRecordsForApplication(Long applicationId, int limit) {
        List<Attendance> records = attendanceRepository.findByApplicationIdOrderByDateDesc(applicationId);

        return records.stream()
                .limit(limit)
                .map(att -> new AttendanceRecentRecordResponse(
                        att.getId(),
                        att.getDate().format(DATE_DISPLAY_FMT),
                        att.getTimeIn() != null ? att.getTimeIn().format(TIME_FMT) : null,
                        att.getTimeOut() != null ? att.getTimeOut().format(TIME_FMT) : null,
                        att.getTimeIn() != null && att.getTimeOut() != null ? computeHoursWorked(att) : null,
                        deriveStatus(att)
                ))
                .collect(Collectors.toList());
    }

    // -------------------------------------------------------------------
    // NEW: time-in / time-out actions
    // -------------------------------------------------------------------
    public AttendanceRecentRecordResponse recordTimeIn(Long applicationId) {
        LocalDate today = LocalDate.now();
        Attendance att = attendanceRepository.findByApplicationIdAndDate(applicationId, today)
                .orElseGet(() -> {
                    Attendance newAtt = new Attendance();
                    newAtt.setApplicationId(applicationId);
                    newAtt.setDate(today);
                    return newAtt;
                });

        if (att.getTimeIn() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Time In already recorded for today.");
        }

        att.setTimeIn(LocalTime.now());
        Attendance saved = attendanceRepository.save(att);

        return new AttendanceRecentRecordResponse(
                saved.getId(),
                saved.getDate().format(DATE_DISPLAY_FMT),
                saved.getTimeIn().format(TIME_FMT),
                null,
                null,
                deriveStatus(saved)
        );
    }

    public AttendanceRecentRecordResponse recordTimeOut(Long applicationId) {
        LocalDate today = LocalDate.now();
        Attendance att = attendanceRepository.findByApplicationIdAndDate(applicationId, today)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Cannot Time Out before Time In has been recorded today."));

        if (att.getTimeIn() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Cannot Time Out before Time In has been recorded today.");
        }
        if (att.getTimeOut() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Time Out already recorded for today.");
        }

        att.setTimeOut(LocalTime.now());
        Attendance saved = attendanceRepository.save(att);

        return new AttendanceRecentRecordResponse(
                saved.getId(),
                saved.getDate().format(DATE_DISPLAY_FMT),
                saved.getTimeIn().format(TIME_FMT),
                saved.getTimeOut().format(TIME_FMT),
                computeHoursWorked(saved),
                deriveStatus(saved)
        );
    }

    // -------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------
    private String deriveStatus(Attendance att) {
        if (att.getTimeIn() == null) {
            return "Absent";
        }
        if (att.getTimeIn().isAfter(LATE_CUTOFF)) {
            return "Late";
        }
        return "Present";
    }

    private double computeHoursWorked(Attendance att) {
        if (att.getTimeIn() == null || att.getTimeOut() == null) {
            return 0.0;
        }
        Duration duration = Duration.between(att.getTimeIn(), att.getTimeOut());
        double hours = duration.toMinutes() / 60.0;
        return Math.round(hours * 100.0) / 100.0;
    }
}