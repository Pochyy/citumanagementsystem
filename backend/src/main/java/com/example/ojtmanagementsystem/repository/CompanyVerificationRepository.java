package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.CompanyVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyVerificationRepository extends JpaRepository<CompanyVerification, Long> {

    Optional<CompanyVerification> findTopByCompanyIdOrderBySubmittedDateDesc(Long companyId);

    List<CompanyVerification> findByStatusOrderBySubmittedDateAsc(
            com.example.ojtmanagementsystem.entity.VerificationStatus status);
}
