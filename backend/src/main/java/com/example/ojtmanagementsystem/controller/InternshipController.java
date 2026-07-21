package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.CreateInternshipRequest;
import com.example.ojtmanagementsystem.dto.InternshipResponse;
import com.example.ojtmanagementsystem.dto.InternshipStatsResponse;
import com.example.ojtmanagementsystem.service.InternshipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    // POST /api/internships/company/{companyId}  -> "Post internship" form submit
    @PostMapping("/company/{companyId}")
    public ResponseEntity<InternshipResponse> create(@PathVariable Long companyId,
                                                       @RequestBody CreateInternshipRequest request) {
        InternshipResponse created = internshipService.createInternship(companyId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // GET /api/internships/company/{companyId}  -> table rows on the listings page
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<InternshipResponse>> getByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(internshipService.getInternshipsByCompany(companyId));
    }

    // GET /api/internships/company/{companyId}/stats -> the 4 stat cards
    @GetMapping("/company/{companyId}/stats")
    public ResponseEntity<InternshipStatsResponse> getStats(@PathVariable Long companyId) {
        return ResponseEntity.ok(internshipService.getStatsForCompany(companyId));
    }

    // GET /api/internships/open -> public/student-facing open listings
    @GetMapping("/open")
    public ResponseEntity<List<InternshipResponse>> getOpen() {
        return ResponseEntity.ok(internshipService.getOpenInternships());
    }

    // GET /api/internships/{id}
    @GetMapping("/{id}")
    public ResponseEntity<InternshipResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getInternship(id));
    }

    // PUT /api/internships/{id}  -> edit an existing posting
    @PutMapping("/{id}")
    public ResponseEntity<InternshipResponse> update(@PathVariable Long id,
                                                       @RequestBody CreateInternshipRequest request) {
        return ResponseEntity.ok(internshipService.updateInternship(id, request));
    }

    // PATCH /api/internships/{id}/status  -> toggle Open/Close, body: {"status": "Close"}
    @PatchMapping("/{id}/status")
    public ResponseEntity<InternshipResponse> updateStatus(@PathVariable Long id,
                                                             @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(internshipService.updateStatus(id, body.get("status")));
    }

    // DELETE /api/internships/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        internshipService.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}