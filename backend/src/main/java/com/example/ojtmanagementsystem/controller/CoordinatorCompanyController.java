package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.CompanyListResponse;
import com.example.ojtmanagementsystem.dto.VerificationUpdateRequest;
import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.entity.Internship;
import com.example.ojtmanagementsystem.repository.CompanyRepository;
import com.example.ojtmanagementsystem.repository.InternshipRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Coordinator-specific endpoints for company management.
 * - GET /api/coordinator/companies — list all companies
 * - PUT /api/coordinator/companies/{companyId}/verification — update verification status
 */
@RestController
@RequestMapping("/api/coordinator/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CoordinatorCompanyController {

    private final CompanyRepository companyRepository;
    private final InternshipRepository internshipRepository;

    public CoordinatorCompanyController(CompanyRepository companyRepository, InternshipRepository internshipRepository) {
        this.companyRepository = companyRepository;
        this.internshipRepository = internshipRepository;
    }

    /**
     * GET /api/coordinator/companies
     * Returns all companies with their details for the coordinator's Company Management page.
     */
    @GetMapping
    public ResponseEntity<List<CompanyListResponse>> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        List<CompanyListResponse> response = companies.stream().map(c -> {
            CompanyListResponse dto = new CompanyListResponse();
            dto.setCompanyId(c.getId());
            dto.setCompanyName(c.getCompanyName() != null ? c.getCompanyName() : "");
            dto.setAddress(c.getAddress() != null ? c.getAddress() : "");
            String firstName = c.getUser().getFirstName() != null ? c.getUser().getFirstName() : "";
            String lastName = c.getUser().getLastName() != null ? c.getUser().getLastName() : "";
            dto.setContactPerson((firstName + " " + lastName).trim());
            dto.setContactNumber(c.getPhone() != null ? c.getPhone() : "");
            dto.setEmail(c.getEmail() != null ? c.getEmail() : "");
            dto.setVerificationStatus(c.getVerificationStatus() != null ? c.getVerificationStatus() : "PENDING_REVIEW");
            
            // Calculate total slots and filled slots from internships
            List<Internship> internships = internshipRepository.findByCompanyIdOrderByPostedDateDesc(c.getId());
            int totalSlots = internships.stream()
                    .mapToInt(i -> i.getAvailableSlots() != null ? i.getAvailableSlots() : 0)
                    .sum();
            int filledSlots = internships.stream()
                    .mapToInt(i -> i.getApplicationsCount() != null ? i.getApplicationsCount() : 0)
                    .sum();
            
            dto.setSlotsFilled(filledSlots);
            dto.setSlotsTotal(totalSlots);
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    /**
     * PUT /api/coordinator/companies/{companyId}/verification
     * Updates the verification status of a company.
     */
    @PutMapping("/{companyId}/verification")
    public ResponseEntity<CompanyListResponse> updateVerificationStatus(
            @PathVariable Long companyId,
            @RequestBody VerificationUpdateRequest request) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));
        company.setVerificationStatus(request.getVerificationStatus());
        companyRepository.save(company);

        CompanyListResponse dto = new CompanyListResponse();
        dto.setCompanyId(company.getId());
        dto.setCompanyName(company.getCompanyName());
        dto.setVerificationStatus(company.getVerificationStatus());
        return ResponseEntity.ok(dto);
    }
}