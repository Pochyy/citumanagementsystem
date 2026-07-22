package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.ApplicationDecisionRequest;
import com.example.ojtmanagementsystem.dto.ApplicationResponse;
import com.example.ojtmanagementsystem.dto.CreateApplicationRequest;
import com.example.ojtmanagementsystem.dto.StudentApplicationResponse;
import com.example.ojtmanagementsystem.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<ApplicationResponse> getAll() {
        return applicationService.getAll();
    }

    @GetMapping("/student/{studentId}")
    public List<ApplicationResponse> getAllForStudent(@PathVariable String studentId) {
        return applicationService.getAllForStudent(studentId);
    }

    @GetMapping("/student/{studentId}/active")
    public ApplicationResponse getActiveForStudent(@PathVariable String studentId) {
        return applicationService.getActiveApplicationForStudent(studentId);
    }

    @GetMapping("/student/{studentId}/details")
    public List<StudentApplicationResponse> getMyApplications(@PathVariable String studentId) {
        return applicationService.getMyApplications(studentId);
    }

    @GetMapping("/company/{companyId}")
    public List<ApplicationResponse> getAllForCompany(@PathVariable Long companyId) {
        return applicationService.getAllForCompany(companyId);
    }

    @PostMapping
    public ApplicationResponse submit(@RequestBody CreateApplicationRequest request) {
        return applicationService.submit(request.getStudentId(), request.getInternshipId());
    }

    @PatchMapping("/{id}/status")
    public ApplicationResponse updateStatus(@PathVariable Long id, @RequestBody ApplicationDecisionRequest request) {
        return applicationService.updateStatus(id, request.getStatus(), request.getNotes());
    }

    @DeleteMapping("/{id}")
    public void reject(@PathVariable Long id) {
        applicationService.reject(id);
    }
}