package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    List<Internship> findByCompanyIdOrderByPostedDateDesc(Long companyId);

    List<Internship> findByStatus(String status);

    long countByCompanyId(Long companyId);

    long countByCompanyIdAndStatus(Long companyId, String status);
}
