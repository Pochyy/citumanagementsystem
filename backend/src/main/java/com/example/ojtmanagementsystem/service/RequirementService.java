package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.RequirementResponse;
import com.example.ojtmanagementsystem.dto.RequirementSummaryResponse;
import com.example.ojtmanagementsystem.entity.RequirementDefinition;
import com.example.ojtmanagementsystem.entity.RequirementSubmission;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.repository.RequirementDefinitionRepository;
import com.example.ojtmanagementsystem.repository.RequirementSubmissionRepository;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequirementService {

    private final RequirementDefinitionRepository definitionRepository;
    private final RequirementSubmissionRepository submissionRepository;
    private final StudentRepository studentRepository;

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MMMM d, yyyy");

    public RequirementService(RequirementDefinitionRepository definitionRepository,
                               RequirementSubmissionRepository submissionRepository,
                               StudentRepository studentRepository) {
        this.definitionRepository = definitionRepository;
        this.submissionRepository = submissionRepository;
        this.studentRepository = studentRepository;
    }

    public List<RequirementResponse> getRequirementsForStudent(String studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found."));

        List<RequirementDefinition> definitions = definitionRepository.findAll();

        return definitions.stream()
                .map(def -> submissionRepository
                        .findByStudent_StudentIdAndRequirementDefinition_Id(studentId, def.getId())
                        .orElseGet(() -> createPendingSubmission(student, def)))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public RequirementSummaryResponse getSummary(String studentId) {
        List<RequirementResponse> requirements = getRequirementsForStudent(studentId);
        int total = requirements.size();
        int completed = (int) requirements.stream().filter(r -> "Completed".equals(r.getStatus())).count();
        int percent = total == 0 ? 0 : (int) Math.round((completed * 100.0) / total);
        return new RequirementSummaryResponse(completed, total, percent);
    }

    public RequirementResponse uploadRequirement(Long submissionId, MultipartFile file, String notes) {
        RequirementSubmission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Requirement not found."));

        if (file != null && !file.isEmpty()) {
            try {
                submission.setFileData(file.getBytes());
                submission.setFileName(file.getOriginalFilename());
                submission.setFileSize(file.getSize());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read uploaded file.");
            }
        }

        submission.setNotes(notes);
        submission.setStatus("Completed");
        submission.setUploadedDate(LocalDate.now());

        submissionRepository.save(submission);
        return toResponse(submission);
    }

    private RequirementSubmission createPendingSubmission(Student student, RequirementDefinition def) {
        RequirementSubmission submission = new RequirementSubmission();
        submission.setStudent(student);
        submission.setRequirementDefinition(def);
        submission.setStatus("Pending");
        return submissionRepository.save(submission);
    }

    private RequirementResponse toResponse(RequirementSubmission submission) {
        String uploadedDateStr = submission.getUploadedDate() != null
                ? submission.getUploadedDate().format(DATE_FORMAT)
                : null;
        String fileSizeStr = submission.getFileSize() != null
                ? formatFileSize(submission.getFileSize())
                : null;

        return new RequirementResponse(
                submission.getId(),
                submission.getRequirementDefinition().getTitle(),
                submission.getRequirementDefinition().getDescription(),
                submission.getStatus(),
                uploadedDateStr,
                fileSizeStr
        );
    }

    private String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        return (bytes / 1024) + " KB";
    }
}