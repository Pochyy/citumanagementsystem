package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // All applications submitted by a given student (any status)
    List<Application> findByStudent_StudentId(String studentId);

    // The student's application in a specific status — used to find their
    // currently ACCEPTED internship for the Attendance page.
    Optional<Application> findByStudent_StudentIdAndStatus(String studentId, String status);
}