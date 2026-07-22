package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
    name = "requirement_submissions",
    uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "requirement_definition_id"})
)
public class RequirementSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "requirement_definition_id")
    private RequirementDefinition requirementDefinition;

    @Column(nullable = false)
    private String status = "Pending"; // "Pending" | "Completed"

    private LocalDate uploadedDate;

    private String fileName;

    private Long fileSize; // bytes

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;

    private String notes;

    public RequirementSubmission() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public RequirementDefinition getRequirementDefinition() { return requirementDefinition; }
    public void setRequirementDefinition(RequirementDefinition requirementDefinition) { this.requirementDefinition = requirementDefinition; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getUploadedDate() { return uploadedDate; }
    public void setUploadedDate(LocalDate uploadedDate) { this.uploadedDate = uploadedDate; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
    public byte[] getFileData() { return fileData; }
    public void setFileData(byte[] fileData) { this.fileData = fileData; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}