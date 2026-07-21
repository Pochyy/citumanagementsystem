package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.repository.CompanyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

/**
 * Standalone lookup used right after login: the frontend only has the
 * logged-in user's userId (from UserResponse), but Internship endpoints
 * need the Company row's own id. This bridges the two.
 *
 * If you already have a CompanyController with its own @RequestMapping("/api/companies"),
 * this coexists fine as long as no other endpoint also maps GET /by-user/{userId}.
 */
@RestController
@RequestMapping("/api/companies")
public class CompanyLookupController {

    private final CompanyRepository companyRepository;

    public CompanyLookupController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Map<String, Object>> getCompanyByUserId(@PathVariable Long userId) {
        Company company = companyRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No company found for this user"));

        return ResponseEntity.ok(Map.of(
                "companyId", company.getId(),
                "companyName", company.getCompanyName() == null ? "" : company.getCompanyName()
        ));
    }
}
