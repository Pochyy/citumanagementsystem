package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.entity.CompanyVerification;
import com.example.ojtmanagementsystem.entity.VerificationStatus;
import com.example.ojtmanagementsystem.repository.CompanyVerificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyVerificationController {

    private final CompanyVerificationRepository repository;

    @Value("${app.upload.dir:uploads/verification}")
    private String uploadDir;

    public CompanyVerificationController(CompanyVerificationRepository repository) {
        this.repository = repository;
        // NOTE: If you want this to also write to companies.verification_status,
        // inject CompanyRepository here and update it in updateStatus() below —
        // I left it out since I haven't seen your Company entity's field type
        // (String vs enum) for verification_status yet.
    }

    // Submit a new verification request
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> submit(
            @RequestParam("companyId") Long companyId,
            @RequestParam("businessRegNo") String businessRegNo,
            @RequestParam("contactPerson") String contactPerson,
            @RequestParam("contactEmail") String contactEmail,
            @RequestParam(value = "contactPhone", required = false) String contactPhone,
            @RequestParam("dtiCertificate") MultipartFile dtiCertificate,
            @RequestParam("moaDocument") MultipartFile moaDocument,
            @RequestParam(value = "businessPermit", required = false) MultipartFile businessPermit
    ) {
        try {
            CompanyVerification cv = new CompanyVerification();
            cv.setCompanyId(companyId);
            cv.setBusinessRegNo(businessRegNo);
            cv.setContactPerson(contactPerson);
            cv.setContactEmail(contactEmail);
            cv.setContactPhone(contactPhone);
            cv.setDtiCertificatePath(storeFile(dtiCertificate));
            cv.setMoaDocumentPath(storeFile(moaDocument));
            if (businessPermit != null && !businessPermit.isEmpty()) {
                cv.setBusinessPermitPath(storeFile(businessPermit));
            }
            cv.setStatus(VerificationStatus.PENDING);
            cv.setSubmittedDate(LocalDateTime.now());

            CompanyVerification saved = repository.save(cv);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to store uploaded files"));
        }
    }

    // Get latest verification status for a company
    @GetMapping("/status/{companyId}")
    public ResponseEntity<?> getStatus(@PathVariable Long companyId) {
        Optional<CompanyVerification> latest =
                repository.findTopByCompanyIdOrderBySubmittedDateDesc(companyId);

        if (latest.isEmpty()) {
            return ResponseEntity.ok(Map.of("status", "NOT_SUBMITTED"));
        }
        return ResponseEntity.ok(latest.get());
    }

    // Coordinator: list all pending submissions for review
    @GetMapping("/pending")
    public ResponseEntity<List<CompanyVerification>> getPending() {
        return ResponseEntity.ok(repository.findByStatusOrderBySubmittedDateAsc(VerificationStatus.PENDING));
    }

    // Coordinator: approve or reject
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        CompanyVerification cv = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Verification record not found"));

        String statusValue = body.get("status"); // "VERIFIED" or "REJECTED"
        cv.setStatus(VerificationStatus.valueOf(statusValue));
        cv.setRemarks(body.getOrDefault("remarks", null));
        cv.setReviewedDate(LocalDateTime.now());

        CompanyVerification saved = repository.save(cv);

        // TODO: also sync companies.verification_status here once I see your
        // Company entity, e.g.:
        // Company company = companyRepository.findById(cv.getCompanyId()).orElseThrow();
        // company.setVerificationStatus(statusValue);
        // companyRepository.save(company);

        return ResponseEntity.ok(saved);
    }

    private String storeFile(MultipartFile file) throws IOException {
        Path dirPath = Paths.get(uploadDir);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = dirPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString();
    }
}
