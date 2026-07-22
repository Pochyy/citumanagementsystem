package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.RequirementResponse;
import com.example.ojtmanagementsystem.dto.RequirementSummaryResponse;
import com.example.ojtmanagementsystem.service.RequirementService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
@CrossOrigin(origins = "http://localhost:3000")
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @GetMapping("/student/{studentId}")
    public List<RequirementResponse> getForStudent(@PathVariable String studentId) {
        return requirementService.getRequirementsForStudent(studentId);
    }

    @GetMapping("/summary/student/{studentId}")
    public RequirementSummaryResponse getSummary(@PathVariable String studentId) {
        return requirementService.getSummary(studentId);
    }

    @PostMapping(value = "/{id}/upload", consumes = "multipart/form-data")
    public RequirementResponse upload(@PathVariable Long id,
                                       @RequestParam("file") MultipartFile file,
                                       @RequestParam(value = "notes", required = false) String notes) {
        return requirementService.uploadRequirement(id, file, notes);
    }
}