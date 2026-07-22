package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudent_StudentId(String studentId);

    // Most recent applications first — used to show the student's latest
    // application/company in coordinator views.
    List<Application> findByStudent_StudentIdOrderByIdDesc(String studentId);

    Optional<Application> findByStudent_StudentIdAndStatus(String studentId, String status);

    List<Application> findByInternship_Company_Id(Long companyId);

    // Live count of applications for one internship — replaces the stale
    // Internship.applicationsCount field, which is never incremented.
    long countByInternship_Id(Long internshipId);

    // Live count of applications across every internship a company has posted —
    // powers the "Applicants" stat card on the dashboard.
    long countByInternship_Company_Id(Long companyId);
}