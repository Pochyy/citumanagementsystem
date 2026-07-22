package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.RequirementSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RequirementSubmissionRepository extends JpaRepository<RequirementSubmission, Long> {
    List<RequirementSubmission> findByStudent_StudentId(String studentId);
    Optional<RequirementSubmission> findByStudent_StudentIdAndRequirementDefinition_Id(String studentId, Long requirementDefinitionId);
}