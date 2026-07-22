package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.AttendanceDayResponse;
import com.example.ojtmanagementsystem.dto.AttendanceRecordResponse;
import com.example.ojtmanagementsystem.entity.Attendance;
import com.example.ojtmanagementsystem.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * Get attendance records for a date range, grouped by application.
     * Returns the shape expected by the ProgressMonitoring frontend.
     */
    public Map<String, Object> getAttendanceByDateRange(LocalDate from, LocalDate to) {
        List<Attendance> records = attendanceRepository.findByDateBetween(from, to);

        // Group by applicationId
        Map<Long, List<Attendance>> grouped = records.stream()
                .collect(Collectors.groupingBy(Attendance::getApplicationId));

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<AttendanceRecordResponse> responseRecords = new ArrayList<>();

        for (Map.Entry<Long, List<Attendance>> entry : grouped.entrySet()) {
            Long applicationId = entry.getKey();
            List<Attendance> appRecords = entry.getValue();

            Map<String, AttendanceDayResponse> attendanceMap = new HashMap<>();
            // Initialize all days in range as null (absent)
            LocalDate current = from;
            while (!current.isAfter(to)) {
                attendanceMap.put(current.format(dateFormatter), null);
                current = current.plusDays(1);
            }

            // Fill in present days
            for (Attendance att : appRecords) {
                String dateKey = att.getDate().format(dateFormatter);
                String timeIn = att.getTimeIn() != null ? att.getTimeIn().format(timeFormatter) : null;
                String timeOut = att.getTimeOut() != null ? att.getTimeOut().format(timeFormatter) : null;
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
}