package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByApplicationIdAndDateBetween(Long applicationId, LocalDate from, LocalDate to);

    List<Attendance> findByDateBetween(LocalDate from, LocalDate to);

    // All attendance rows for one student's application, most recent first —
    // used for the "Recent Attendance Record" table (top N taken in service).
    List<Attendance> findByApplicationIdOrderByDateDesc(Long applicationId);

    // Today's row for a given application, if it exists — used by
    // time-in/time-out to find-or-create today's record.
    Optional<Attendance> findByApplicationIdAndDate(Long applicationId, LocalDate date);
}