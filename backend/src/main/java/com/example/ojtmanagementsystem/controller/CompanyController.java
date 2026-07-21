package com.example.ojtmanagementsystem.controller;

import org.springframework.web.bind.annotation.*;

import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    // GET /api/company/5  -> profile for the company whose User.userId = 5
    @GetMapping("/{userId}")
    public Company getCompany(@PathVariable Long userId) {
        return service.getCompanyByUserId(userId);
    }

    // PUT /api/company/5  -> update that company's profile fields
    // (No POST anymore - the row is created automatically at registration.)
    @PutMapping("/{userId}")
    public Company updateCompany(@PathVariable Long userId, @RequestBody Company company) {
        System.out.println("Updating company profile for userId: " + userId);
        return service.saveCompany(userId, company);
    }
}
