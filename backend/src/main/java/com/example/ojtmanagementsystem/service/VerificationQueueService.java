package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class VerificationQueueService {

    private final JdbcTemplate jdbcTemplate;

    public VerificationQueueService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void queueStudentRegistration(User user, Student student) {
        String studentNumber = required(student.getStudentId(), "student number");
        String mirrorEmail = studentNumber + "@student.cit.local";
        long mirrorUserId = ensureMirrorUser(mirrorEmail, "STUDENT");
        long profileId = ensureStudentProfile(mirrorUserId, studentNumber);

        createPendingDocumentSubmissions("STUDENT", mirrorUserId, profileId, null, studentNumber);
        markStudentPending(studentNumber);
    }

    public void queueCompanyRegistration(User user, Company company) {
        ensureCompanyMirror(user, company);
    }

    public void queueCompanyUploadedDocuments(Company company, List<UploadedVerificationDocument> documents) {
        MirrorCompany mirror = ensureCompanyMirror(company.getUser(), company);
        for (UploadedVerificationDocument document : documents) {
            if (document == null) {
                continue;
            }
            upsertCompanyDocument(mirror, document);
        }
    }

    public void syncCompanyStatus(Long appCompanyId, String status) {
        String profileStatus = normalizeProfileStatus(status);
        String accountStatus = "VERIFIED".equals(profileStatus) ? "ACTIVE" : "PENDING_VERIFICATION";
        String userStatus = "VERIFIED".equals(profileStatus) ? "ACTIVE" : "PENDING_REVIEW";

        jdbcTemplate.update("""
                UPDATE company_profiles cp
                JOIN companies c ON c.id = ?
                JOIN users u ON u.user_id = c.user_id AND u.email = cp.company_email
                SET cp.verification_status = ?,
                    cp.verified_at = CASE WHEN ? = 'VERIFIED' THEN CURRENT_TIMESTAMP ELSE NULL END
                """, appCompanyId, profileStatus, profileStatus);

        jdbcTemplate.update("""
                UPDATE user_accounts ua
                JOIN company_profiles cp ON cp.user_id = ua.user_id
                JOIN companies c ON c.id = ?
                JOIN users u ON u.user_id = c.user_id AND u.email = cp.company_email
                SET ua.account_status = ?
                """, appCompanyId, accountStatus);

        jdbcTemplate.update("""
                UPDATE companies c
                JOIN users u ON u.user_id = c.user_id
                SET c.verification_status = ?,
                    c.verified_at = CASE WHEN ? = 'VERIFIED' THEN CURRENT_TIMESTAMP ELSE NULL END
                WHERE c.id = ?
                """, profileStatus, profileStatus, appCompanyId);

        jdbcTemplate.update("""
                UPDATE users u
                JOIN companies c ON c.user_id = u.user_id
                SET u.status = ?
                WHERE c.id = ?
                """, userStatus, appCompanyId);
    }

    private MirrorCompany ensureCompanyMirror(User user, Company company) {
        String companyName = required(company.getCompanyName(), "company name");
        String email = user != null && user.getEmail() != null && !user.getEmail().isBlank()
                ? user.getEmail().trim()
                : fallbackCompanyEmail(company);

        long mirrorUserId = ensureMirrorUser(email, "COMPANY");
        Long existingProfileId = queryLong("""
                SELECT company_id
                FROM company_profiles
                WHERE company_email = ?
                LIMIT 1
                """, email);

        if (existingProfileId == null) {
            jdbcTemplate.update("""
                    INSERT INTO company_profiles
                        (user_id, company_name, industry, contact_person, contact_number, company_email, address, verification_status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING')
                    """,
                    mirrorUserId,
                    companyName,
                    valueOrDefault(company.getIndustry(), "Pending profile completion"),
                    "Company Representative",
                    company.getPhone(),
                    email,
                    valueOrDefault(company.getAddress(), "Pending profile completion"));
            existingProfileId = lastInsertId();
        } else {
            jdbcTemplate.update("""
                    UPDATE company_profiles
                    SET company_name = ?,
                        industry = COALESCE(NULLIF(?, ''), industry),
                        contact_number = COALESCE(NULLIF(?, ''), contact_number),
                        address = COALESCE(NULLIF(?, ''), address)
                    WHERE company_id = ?
                    """,
                    companyName,
                    company.getIndustry(),
                    company.getPhone(),
                    company.getAddress(),
                    existingProfileId);
        }

        createPendingDocumentSubmissions("COMPANY", mirrorUserId, null, existingProfileId, companyName);
        syncCompanyStatus(company.getId(), "PENDING");
        return new MirrorCompany(mirrorUserId, existingProfileId, companyName);
    }

    private long ensureMirrorUser(String email, String role) {
        Long existingUserId = queryLong("""
                SELECT user_id
                FROM user_accounts
                WHERE email = ?
                LIMIT 1
                """, email);

        if (existingUserId != null) {
            return existingUserId;
        }

        jdbcTemplate.update("""
                INSERT INTO user_accounts (email, password_hash, role, account_status)
                VALUES (?, 'managed-by-users-table', ?, 'PENDING_VERIFICATION')
                """, email, role);
        return lastInsertId();
    }

    private long ensureStudentProfile(long mirrorUserId, String studentNumber) {
        Long existingProfileId = queryLong("""
                SELECT student_id
                FROM student_profiles
                WHERE student_number = ?
                LIMIT 1
                """, studentNumber);

        if (existingProfileId != null) {
            return existingProfileId;
        }

        jdbcTemplate.update("""
                INSERT INTO student_profiles
                    (user_id, student_number, first_name, last_name, program, year_level, school_name, verification_status)
                VALUES (?, ?, 'Student', ?, 'Pending profile completion', 1,
                    'Cebu Institute of Technology - University', 'PENDING')
                """, mirrorUserId, studentNumber, studentNumber);
        return lastInsertId();
    }

    private void createPendingDocumentSubmissions(
            String ownerType,
            long mirrorUserId,
            Long studentProfileId,
            Long companyProfileId,
            String ownerLabel) {

        List<DocumentType> documentTypes = jdbcTemplate.query("""
                SELECT document_type_id, name
                FROM document_types
                WHERE owner_type = ?
                  AND is_required = TRUE
                  AND is_active = TRUE
                ORDER BY document_type_id
                """, (rs, rowNum) -> new DocumentType(rs.getLong("document_type_id"), rs.getString("name")), ownerType);

        for (DocumentType documentType : documentTypes) {
            boolean exists = submissionExists(documentType.id(), studentProfileId, companyProfileId);
            if (exists) {
                continue;
            }

            String pendingPath = "pending://registration/" + ownerType.toLowerCase(Locale.ENGLISH)
                    + "/" + (studentProfileId != null ? studentProfileId : companyProfileId)
                    + "/" + slug(documentType.name());

            jdbcTemplate.update("""
                    INSERT INTO document_submissions
                        (document_type_id, submitted_by_user_id, student_id, company_id,
                         file_name, file_url, file_mime_type, file_size_bytes, status)
                    VALUES (?, ?, ?, ?, ?, ?, 'pending/verification', 0, 'PENDING')
                    """,
                    documentType.id(),
                    mirrorUserId,
                    studentProfileId,
                    companyProfileId,
                    ownerLabel + " - " + documentType.name() + " requirement",
                    pendingPath);
        }
    }

    private void upsertCompanyDocument(MirrorCompany mirror, UploadedVerificationDocument document) {
        long documentTypeId = ensureDocumentType("COMPANY", document.documentName());
        Long existingSubmissionId = queryLong("""
                SELECT submission_id
                FROM document_submissions
                WHERE company_id = ?
                  AND document_type_id = ?
                LIMIT 1
                """, mirror.companyProfileId(), documentTypeId);

        if (existingSubmissionId == null) {
            jdbcTemplate.update("""
                    INSERT INTO document_submissions
                        (document_type_id, submitted_by_user_id, company_id, file_name, file_url,
                         file_mime_type, file_size_bytes, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING')
                    """,
                    documentTypeId,
                    mirror.mirrorUserId(),
                    mirror.companyProfileId(),
                    document.fileName(),
                    document.fileUrl(),
                    document.mimeType(),
                    document.sizeBytes());
            return;
        }

        jdbcTemplate.update("""
                UPDATE document_submissions
                SET submitted_by_user_id = ?,
                    file_name = ?,
                    file_url = ?,
                    file_mime_type = ?,
                    file_size_bytes = ?,
                    status = 'PENDING',
                    reviewer_notes = NULL,
                    reviewed_at = NULL,
                    reviewed_by_user_id = NULL,
                    submitted_at = CURRENT_TIMESTAMP
                WHERE submission_id = ?
                """,
                mirror.mirrorUserId(),
                document.fileName(),
                document.fileUrl(),
                document.mimeType(),
                document.sizeBytes(),
                existingSubmissionId);
    }

    private long ensureDocumentType(String ownerType, String name) {
        Long existingDocumentTypeId = queryLong("""
                SELECT document_type_id
                FROM document_types
                WHERE owner_type = ?
                  AND name = ?
                LIMIT 1
                """, ownerType, name);

        if (existingDocumentTypeId != null) {
            return existingDocumentTypeId;
        }

        jdbcTemplate.update("""
                INSERT INTO document_types (owner_type, name, description, is_required, is_active)
                VALUES (?, ?, 'Required verification document.', TRUE, TRUE)
                """, ownerType, name);
        return lastInsertId();
    }

    private boolean submissionExists(long documentTypeId, Long studentProfileId, Long companyProfileId) {
        Integer count = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM document_submissions
                WHERE document_type_id = ?
                  AND ((? IS NOT NULL AND student_id = ?) OR (? IS NOT NULL AND company_id = ?))
                """, Integer.class, documentTypeId, studentProfileId, studentProfileId, companyProfileId, companyProfileId);
        return count != null && count > 0;
    }

    private void markStudentPending(String studentNumber) {
        jdbcTemplate.update("""
                UPDATE students
                SET verification_status = 'PENDING',
                    verified_at = NULL
                WHERE student_id = ?
                """, studentNumber);
    }

    private Long queryLong(String sql, Object... args) {
        return jdbcTemplate.query(sql, rs -> rs.next() ? rs.getLong(1) : null, args);
    }

    private long lastInsertId() {
        Long id = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
        if (id == null) {
            throw new IllegalStateException("Unable to read generated id.");
        }
        return id;
    }

    private String fallbackCompanyEmail(Company company) {
        String companyEmail = company.getEmail();
        if (companyEmail != null && !companyEmail.isBlank()) {
            return companyEmail.trim();
        }
        return "company-" + company.getId() + "@company.cit.local";
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }

    private String required(String value, String label) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Missing " + label + " for verification queue.");
        }
        return value.trim();
    }

    private String normalizeProfileStatus(String status) {
        if (status == null) {
            return "PENDING";
        }
        return switch (status.trim().toUpperCase(Locale.ENGLISH)) {
            case "VERIFIED", "APPROVED" -> "VERIFIED";
            case "REJECTED" -> "REJECTED";
            default -> "PENDING";
        };
    }

    private String slug(String value) {
        return value.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

    private record MirrorCompany(long mirrorUserId, long companyProfileId, String companyName) {
    }

    private record DocumentType(long id, String name) {
    }

    public record UploadedVerificationDocument(
            String documentName,
            String fileName,
            String fileUrl,
            String mimeType,
            long sizeBytes) {
    }
}
