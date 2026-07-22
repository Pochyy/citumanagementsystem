package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "company_verification")
public class CompanyVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "business_reg_no", nullable = false)
    private String businessRegNo;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "contact_email", nullable = false)
    private String contactEmail;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(name = "dti_certificate_path", nullable = false)
    private String dtiCertificatePath;

    @Column(name = "moa_document_path", nullable = false)
    private String moaDocumentPath;

    @Column(name = "business_permit_path")
    private String businessPermitPath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus status = VerificationStatus.PENDING;

    private String remarks;

    @Column(name = "submitted_date", nullable = false)
    private LocalDateTime submittedDate = LocalDateTime.now();

    @Column(name = "reviewed_date")
    private LocalDateTime reviewedDate;

    // ---- getters and setters ----

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getBusinessRegNo() { return businessRegNo; }
    public void setBusinessRegNo(String businessRegNo) { this.businessRegNo = businessRegNo; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getDtiCertificatePath() { return dtiCertificatePath; }
    public void setDtiCertificatePath(String dtiCertificatePath) { this.dtiCertificatePath = dtiCertificatePath; }

    public String getMoaDocumentPath() { return moaDocumentPath; }
    public void setMoaDocumentPath(String moaDocumentPath) { this.moaDocumentPath = moaDocumentPath; }

    public String getBusinessPermitPath() { return businessPermitPath; }
    public void setBusinessPermitPath(String businessPermitPath) { this.businessPermitPath = businessPermitPath; }

    public VerificationStatus getStatus() { return status; }
    public void setStatus(VerificationStatus status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDateTime submittedDate) { this.submittedDate = submittedDate; }

    public LocalDateTime getReviewedDate() { return reviewedDate; }
    public void setReviewedDate(LocalDateTime reviewedDate) { this.reviewedDate = reviewedDate; }
}
