package com.example.ojtmanagementsystem.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    // Read the profile belonging to a specific logged-in company user.
    public Company getCompanyByUserId(Long userId) {
        return repository.findByUser_UserId(userId).orElse(null);
    }

    // Update the profile fields for a specific company. The row itself is
    // created at registration (AuthService.registerCompany), so this only
    // ever updates an existing row - it never creates one and it never
    // touches verificationStatus.
    public Company saveCompany(Long userId, Company incoming) {

        Company existing = repository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No company account found for this user."));

        existing.setCompanyName(incoming.getCompanyName());
        existing.setTagline(incoming.getTagline());
        existing.setIndustry(incoming.getIndustry());
        existing.setCompanySize(incoming.getCompanySize());
        existing.setEmail(incoming.getEmail());
        existing.setWebsite(incoming.getWebsite());
        existing.setPhone(incoming.getPhone());
        existing.setAbout(incoming.getAbout());
        existing.setAddress(incoming.getAddress());

        return repository.save(existing);
    }
}
