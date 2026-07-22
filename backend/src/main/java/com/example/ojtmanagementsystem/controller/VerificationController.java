package com.example.ojtmanagementsystem.controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class VerificationController {

    private static final DateTimeFormatter SUBMITTED_FORMAT =
            DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);

    private final JdbcTemplate jdbcTemplate;

    public VerificationController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public VerificationResponse getVerificationData() {
        List<StudentDocumentDto> studentDocs = jdbcTemplate.query("""
                SELECT submission_id, student_name, student_number, document_name, file_name, file_url, status, submitted_at
                FROM v_student_document_verification
                ORDER BY submitted_at DESC
                """, new StudentDocumentMapper());

        List<CompanyDocumentDto> companyDocs = jdbcTemplate.query("""
                SELECT submission_id, company_name, contact_person, document_name, file_name, file_url, status, submitted_at
                FROM v_company_document_verification
                ORDER BY submitted_at DESC
                """, new CompanyDocumentMapper());

        CountsDto counts = new CountsDto(
                countDocuments("STUDENT", "PENDING"),
                countDocuments("STUDENT", "VERIFIED"),
                countDocuments("COMPANY", "PENDING"),
                countDocuments("COMPANY", "VERIFIED"));

        return new VerificationResponse(studentDocs, companyDocs, counts);
    }

    @PutMapping("/student-documents/{submissionId}/status")
    public VerificationResponse updateStudentDocumentStatus(
            @PathVariable long submissionId,
            @RequestBody StatusUpdateRequest request) {
        updateDocumentStatus(submissionId, "STUDENT", request);
        return getVerificationData();
    }

    @PutMapping("/company-documents/{submissionId}/status")
    public VerificationResponse updateCompanyDocumentStatus(
            @PathVariable long submissionId,
            @RequestBody StatusUpdateRequest request) {
        updateDocumentStatus(submissionId, "COMPANY", request);
        return getVerificationData();
    }

    private void updateDocumentStatus(long submissionId, String ownerType, StatusUpdateRequest request) {
        String newStatus = normalizeStatus(request.status());
        long reviewerUserId = ensureSystemReviewer();

        SubmissionStatus current = jdbcTemplate.query("""
                SELECT ds.status
                FROM document_submissions ds
                JOIN document_types dt ON dt.document_type_id = ds.document_type_id
                WHERE ds.submission_id = ? AND dt.owner_type = ?
                """, rs -> rs.next() ? new SubmissionStatus(rs.getString("status")) : null, submissionId, ownerType);

        if (current == null) {
            throw new ResponseStatusException(NOT_FOUND, "Document submission was not found.");
        }

        jdbcTemplate.update("""
                UPDATE document_submissions
                SET status = ?, reviewer_notes = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by_user_id = ?
                WHERE submission_id = ?
                """, newStatus, request.notes(), reviewerUserId, submissionId);

        jdbcTemplate.update("""
                INSERT INTO document_verification_reviews
                    (submission_id, reviewer_user_id, old_status, new_status, notes)
                VALUES (?, ?, ?, ?, ?)
                """, submissionId, reviewerUserId, current.status(), newStatus, request.notes());

        updateOwnerVerificationStatus(submissionId, ownerType);
    }

    private void updateOwnerVerificationStatus(long submissionId, String ownerType) {
        if ("STUDENT".equals(ownerType)) {
            Long studentId = jdbcTemplate.queryForObject(
                    "SELECT student_id FROM document_submissions WHERE submission_id = ?",
                    Long.class,
                    submissionId);
            boolean allVerified = requiredDocumentsAllVerified("STUDENT", studentId, null);
            boolean hasRejected = ownerHasRejectedDocument("STUDENT", studentId, null);
            String profileStatus = hasRejected ? "REJECTED" : allVerified ? "VERIFIED" : "PENDING";
            String accountStatus = hasRejected ? "REJECTED" : allVerified ? "ACTIVE" : "PENDING_VERIFICATION";
            String appUserStatus = allVerified ? "ACTIVE" : "PENDING_REVIEW";
            jdbcTemplate.update("""
                    UPDATE student_profiles
                    SET verification_status = ?, verified_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END
                    WHERE student_id = ?
                    """, profileStatus, allVerified, studentId);
            jdbcTemplate.update("""
                    UPDATE user_accounts ua
                    JOIN student_profiles sp ON sp.user_id = ua.user_id
                    SET ua.account_status = ?
                    WHERE sp.student_id = ?
                    """, accountStatus, studentId);
            jdbcTemplate.update("""
                    UPDATE students s
                    JOIN student_profiles sp ON sp.student_number = s.student_id
                    SET s.verification_status = ?,
                        s.verified_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END
                    WHERE sp.student_id = ?
                    """, profileStatus, allVerified, studentId);
            jdbcTemplate.update("""
                    UPDATE users u
                    JOIN students s ON s.user_id = u.user_id
                    JOIN student_profiles sp ON sp.student_number = s.student_id
                    SET u.status = ?
                    WHERE sp.student_id = ?
                    """, appUserStatus, studentId);
            return;
        }

        Long companyId = jdbcTemplate.queryForObject(
                "SELECT company_id FROM document_submissions WHERE submission_id = ?",
                Long.class,
                submissionId);
        boolean allVerified = requiredDocumentsAllVerified("COMPANY", null, companyId);
        boolean hasRejected = ownerHasRejectedDocument("COMPANY", null, companyId);
        String profileStatus = hasRejected ? "REJECTED" : allVerified ? "VERIFIED" : "PENDING";
        String accountStatus = hasRejected ? "REJECTED" : allVerified ? "ACTIVE" : "PENDING_VERIFICATION";
        String appUserStatus = allVerified ? "ACTIVE" : "PENDING_REVIEW";
        String appCompanyStatus = "PENDING".equals(profileStatus) ? "PENDING_REVIEW" : profileStatus;
        jdbcTemplate.update("""
                UPDATE company_profiles
                SET verification_status = ?, verified_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END
                WHERE company_id = ?
                """, profileStatus, allVerified, companyId);
        jdbcTemplate.update("""
                UPDATE user_accounts ua
                JOIN company_profiles cp ON cp.user_id = ua.user_id
                SET ua.account_status = ?
                WHERE cp.company_id = ?
                """, accountStatus, companyId);
        jdbcTemplate.update("""
                UPDATE companies c
                JOIN users u ON u.user_id = c.user_id
                JOIN company_profiles cp ON cp.company_email = u.email
                SET c.verification_status = ?,
                    c.verified_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END
                WHERE cp.company_id = ?
                """, appCompanyStatus, allVerified, companyId);
        jdbcTemplate.update("""
                UPDATE users u
                JOIN companies c ON c.user_id = u.user_id
                JOIN company_profiles cp ON cp.company_email = u.email
                SET u.status = ?
                WHERE cp.company_id = ?
                """, appUserStatus, companyId);
        jdbcTemplate.update("""
                UPDATE company_verification cv
                JOIN companies c ON c.id = cv.company_id
                JOIN users u ON u.user_id = c.user_id
                JOIN company_profiles cp ON cp.company_email = u.email
                SET cv.status = ?,
                    cv.reviewed_date = CASE WHEN ? <> 'PENDING' THEN CURRENT_TIMESTAMP ELSE cv.reviewed_date END
                WHERE cp.company_id = ?
                """, profileStatus, profileStatus, companyId);
    }

    private boolean requiredDocumentsAllVerified(String ownerType, Long studentId, Long companyId) {
        Integer missingOrUnverified = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM document_types dt
                LEFT JOIN document_submissions ds
                    ON ds.document_type_id = dt.document_type_id
                    AND ((? IS NOT NULL AND ds.student_id = ?) OR (? IS NOT NULL AND ds.company_id = ?))
                    AND ds.status = 'VERIFIED'
                WHERE dt.owner_type = ?
                    AND dt.is_required = TRUE
                    AND dt.is_active = TRUE
                    AND ds.submission_id IS NULL
                """, Integer.class, studentId, studentId, companyId, companyId, ownerType);
        return missingOrUnverified != null && missingOrUnverified == 0;
    }

    private boolean ownerHasRejectedDocument(String ownerType, Long studentId, Long companyId) {
        Integer rejectedCount = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM document_submissions ds
                JOIN document_types dt ON dt.document_type_id = ds.document_type_id
                WHERE dt.owner_type = ?
                    AND ds.status = 'REJECTED'
                    AND ((? IS NOT NULL AND ds.student_id = ?) OR (? IS NOT NULL AND ds.company_id = ?))
                """, Integer.class, ownerType, studentId, studentId, companyId, companyId);
        return rejectedCount != null && rejectedCount > 0;
    }

    private int countDocuments(String ownerType, String status) {
        Integer count = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM document_submissions ds
                JOIN document_types dt ON dt.document_type_id = ds.document_type_id
                WHERE dt.owner_type = ? AND ds.status = ?
                """, Integer.class, ownerType, status);
        return count == null ? 0 : count;
    }

    private long ensureSystemReviewer() {
        Long existing = jdbcTemplate.query("""
                SELECT user_id FROM user_accounts
                WHERE email = 'system.verifier@cit.local'
                LIMIT 1
                """, rs -> rs.next() ? rs.getLong("user_id") : null);
        if (existing != null) {
            return existing;
        }

        jdbcTemplate.update("""
                INSERT INTO user_accounts (email, password_hash, role, account_status)
                VALUES ('system.verifier@cit.local', 'system-generated', 'COORDINATOR', 'ACTIVE')
                """);
        return jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
    }

    private String normalizeStatus(String status) {
        if (status == null) {
            throw new ResponseStatusException(BAD_REQUEST, "Status is required.");
        }

        String normalized = status.trim().toUpperCase(Locale.ENGLISH);
        if (!List.of("PENDING", "VERIFIED", "REJECTED").contains(normalized)) {
            throw new ResponseStatusException(BAD_REQUEST, "Status must be PENDING, VERIFIED, or REJECTED.");
        }
        return normalized;
    }

    private static String toUiStatus(String status) {
        return switch (status) {
            case "VERIFIED" -> "Verified";
            case "REJECTED" -> "Rejected";
            default -> "Pending";
        };
    }

    private static String formatSubmitted(Timestamp submittedAt) {
        if (submittedAt == null) {
            return "";
        }
        return submittedAt.toLocalDateTime().format(SUBMITTED_FORMAT);
    }

    private record SubmissionStatus(String status) {
    }

    public record StatusUpdateRequest(String status, String notes) {
    }

    public record VerificationResponse(
            List<StudentDocumentDto> studentDocs,
            List<CompanyDocumentDto> companyDocs,
            CountsDto counts) {
    }

    public record CountsDto(
            int studentPending,
            int studentVerified,
            int companyPending,
            int companyVerified) {
    }

    public record StudentDocumentDto(
            long id,
            String student,
            String document,
            String submitted,
            String status,
            String content,
            String fileName,
            String fileUrl) {
    }

    public record CompanyDocumentDto(
            long id,
            String company,
            String document,
            String submitted,
            String status,
            String content,
            String fileName,
            String fileUrl) {
    }

    private static class StudentDocumentMapper implements RowMapper<StudentDocumentDto> {
        @Override
        public StudentDocumentDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            String fileName = rs.getString("file_name");
            String fileUrl = rs.getString("file_url");
            String studentNumber = rs.getString("student_number");
            String studentName = rs.getString("student_name");
            String displayName = studentName.contains(studentNumber)
                    ? studentName
                    : studentName + " (" + studentNumber + ")";
            return new StudentDocumentDto(
                    rs.getLong("submission_id"),
                    displayName,
                    rs.getString("document_name"),
                    formatSubmitted(rs.getTimestamp("submitted_at")),
                    toUiStatus(rs.getString("status")),
                    "Student ID: " + studentNumber
                            + "\nRequirement: " + rs.getString("document_name")
                            + "\nStatus: " + toUiStatus(rs.getString("status"))
                            + "\nFile reference: " + fileName
                            + "\nStorage path: " + fileUrl,
                    fileName,
                    fileUrl);
        }
    }

    private static class CompanyDocumentMapper implements RowMapper<CompanyDocumentDto> {
        @Override
        public CompanyDocumentDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            String fileName = rs.getString("file_name");
            String fileUrl = rs.getString("file_url");
            return new CompanyDocumentDto(
                    rs.getLong("submission_id"),
                    rs.getString("company_name"),
                    rs.getString("document_name"),
                    formatSubmitted(rs.getTimestamp("submitted_at")),
                    toUiStatus(rs.getString("status")),
                    "Company: " + rs.getString("company_name")
                            + "\nContact person: " + rs.getString("contact_person")
                            + "\nRequirement: " + rs.getString("document_name")
                            + "\nStatus: " + toUiStatus(rs.getString("status"))
                            + "\nFile reference: " + fileName
                            + "\nStorage path: " + fileUrl,
                    fileName,
                    fileUrl);
        }
    }
}
