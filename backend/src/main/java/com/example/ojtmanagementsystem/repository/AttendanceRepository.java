package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByApplicationIdAndDateBetween(Long applicationId, LocalDate from, LocalDate to);
    List<Attendance> findByDateBetween(LocalDate from, LocalDate to);
}