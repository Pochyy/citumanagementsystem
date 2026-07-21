package com.example.ojtmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ojtmanagementsystem.entity.Company;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUser_UserId(Long userId);
}
