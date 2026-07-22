package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.entity.CompanyVerification;
import com.example.ojtmanagementsystem.entity.VerificationStatus;
import com.example.ojtmanagementsystem.repository.CompanyRepository;
import com.example.ojtmanagementsystem.repository.CompanyVerificationRepository;
import com.example.ojtmanagementsystem.service.VerificationQueueService;
import com.example.ojtmanagementsystem.service.VerificationQueueService.UploadedVerificationDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class CompanyVerificationController {

    private final CompanyVerificationRepository repository;
    private final CompanyRepository companyRepository;
    private final VerificationQueueService verificationQueueService;

    @Value("${app.upload.dir:uploads/verification}")
    private String uploadDir;

    public CompanyVerificationController(CompanyVerificationRepository repository,
                                         CompanyRepository companyRepository,
                                         VerificationQueueService verificationQueueService) {
        this.repository = repository;
        this.companyRepository = companyRepository;
        this.verificationQueueService = verificationQueueService;
    }

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
            Company company = companyRepository.findById(companyId)
                    .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

            StoredFile dtiFile = storeFile(dtiCertificate);
            StoredFile moaFile = storeFile(moaDocument);
            StoredFile permitFile = businessPermit != null && !businessPermit.isEmpty()
                    ? storeFile(businessPermit)
                    : null;

            CompanyVerification cv = new CompanyVerification();
            cv.setCompanyId(companyId);
            cv.setBusinessRegNo(businessRegNo);
            cv.setContactPerson(contactPerson);
            cv.setContactEmail(contactEmail);
            cv.setContactPhone(contactPhone);
            cv.setDtiCertificatePath(dtiFile.path());
            cv.setMoaDocumentPath(moaFile.path());
            if (permitFile != null) {
                cv.setBusinessPermitPath(permitFile.path());
            }
            cv.setStatus(VerificationStatus.PENDING);
            cv.setSubmittedDate(LocalDateTime.now());

            CompanyVerification saved = repository.save(cv);
            verificationQueueService.queueCompanyUploadedDocuments(company, toVerificationDocuments(dtiFile, moaFile, permitFile));

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to store uploaded files"));
        }
    }

    @GetMapping("/status/{companyId}")
    public ResponseEntity<?> getStatus(@PathVariable Long companyId) {
        Optional<CompanyVerification> latest =
                repository.findTopByCompanyIdOrderBySubmittedDateDesc(companyId);

        if (latest.isEmpty()) {
            return ResponseEntity.ok(Map.of("status", "NOT_SUBMITTED"));
        }
        return ResponseEntity.ok(latest.get());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<CompanyVerification>> getPending() {
        return ResponseEntity.ok(repository.findByStatusOrderBySubmittedDateAsc(VerificationStatus.PENDING));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        CompanyVerification cv = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Verification record not found"));

        String statusValue = body.get("status");
        cv.setStatus(VerificationStatus.valueOf(statusValue));
        cv.setRemarks(body.getOrDefault("remarks", null));
        cv.setReviewedDate(LocalDateTime.now());

        CompanyVerification saved = repository.save(cv);
        verificationQueueService.syncCompanyStatus(saved.getCompanyId(), statusValue);

        return ResponseEntity.ok(saved);
    }

    private List<UploadedVerificationDocument> toVerificationDocuments(
            StoredFile dtiFile,
            StoredFile moaFile,
            StoredFile permitFile) {

        List<UploadedVerificationDocument> documents = new ArrayList<>();
        documents.add(new UploadedVerificationDocument(
                "Accreditation Letter",
                dtiFile.originalName(),
                dtiFile.path(),
                dtiFile.contentType(),
                dtiFile.sizeBytes()));
        documents.add(new UploadedVerificationDocument(
                "Memorandum of Agreement",
                moaFile.originalName(),
                moaFile.path(),
                moaFile.contentType(),
                moaFile.sizeBytes()));
        if (permitFile != null) {
            documents.add(new UploadedVerificationDocument(
                    "Business Permit",
                    permitFile.originalName(),
                    permitFile.path(),
                    permitFile.contentType(),
                    permitFile.sizeBytes()));
        }
        return documents;
    }

    private StoredFile storeFile(MultipartFile file) throws IOException {
        Path dirPath = Paths.get(uploadDir);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }
        String originalName = file.getOriginalFilename() == null ? "document" : file.getOriginalFilename();
        String filename = UUID.randomUUID() + "_" + originalName;
        Path filePath = dirPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return new StoredFile(originalName, filePath.toString(), file.getContentType(), file.getSize());
    }

    private record StoredFile(String originalName, String path, String contentType, long sizeBytes) {
    }
}
