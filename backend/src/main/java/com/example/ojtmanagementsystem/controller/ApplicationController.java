package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.ApplicationDecisionRequest;
import com.example.ojtmanagementsystem.dto.ApplicationResponse;
import com.example.ojtmanagementsystem.dto.CreateApplicationRequest;
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
