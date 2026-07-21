package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.CreateInternshipRequest;
import com.example.ojtmanagementsystem.dto.InternshipResponse;
import com.example.ojtmanagementsystem.dto.InternshipStatsResponse;
import com.example.ojtmanagementsystem.entity.Company;
import com.example.ojtmanagementsystem.entity.Internship;
import com.example.ojtmanagementsystem.repository.CompanyRepository;
import com.example.ojtmanagementsystem.repository.InternshipRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final CompanyRepository companyRepository;

    public InternshipService(InternshipRepository internshipRepository,
                              CompanyRepository companyRepository) {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
    }

    @Transactional
    public InternshipResponse createInternship(Long companyId, CreateInternshipRequest request) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));

        validate(request);

        Internship internship = new Internship();
        internship.setCompany(company);
        applyRequest(internship, request);

        Internship saved = internshipRepository.save(internship);
        return InternshipResponse.from(saved);
    }

    @Transactional
    public InternshipResponse updateInternship(Long id, CreateInternshipRequest request) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Internship not found"));

        validate(request);
        applyRequest(internship, request);

        Internship saved = internshipRepository.save(internship);
        return InternshipResponse.from(saved);
    }

    @Transactional
    public InternshipResponse updateStatus(Long id, String status) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Internship not found"));

        if (!"Open".equalsIgnoreCase(status) && !"Close".equalsIgnoreCase(status)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status must be 'Open' or 'Close'");
        }
        internship.setStatus(status);
        return InternshipResponse.from(internshipRepository.save(internship));
    }

    @Transactional(readOnly = true)
    public InternshipResponse getInternship(Long id) {
        Internship internship = internshipRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Internship not found"));
        return InternshipResponse.from(internship);
    }

    @Transactional(readOnly = true)
    public List<InternshipResponse> getInternshipsByCompany(Long companyId) {
        return internshipRepository.findByCompanyIdOrderByPostedDateDesc(companyId)
                .stream()
                .map(InternshipResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<InternshipResponse> getOpenInternships() {
        return internshipRepository.findByStatus("Open")
                .stream()
                .map(InternshipResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InternshipStatsResponse getStatsForCompany(Long companyId) {
        List<Internship> internships = internshipRepository.findByCompanyIdOrderByPostedDateDesc(companyId);

        long totalPostings = internships.size();
        long currentlyOpen = internships.stream()
                .filter(i -> "Open".equalsIgnoreCase(i.getStatus()))
                .count();
        long totalSlots = internships.stream()
                .mapToLong(i -> i.getAvailableSlots() == null ? 0 : i.getAvailableSlots())
                .sum();
        long totalApplicants = internships.stream()
                .mapToLong(i -> i.getApplicationsCount() == null ? 0 : i.getApplicationsCount())
                .sum();

        return new InternshipStatsResponse(totalPostings, currentlyOpen, totalSlots, totalApplicants);
    }

    @Transactional
    public void deleteInternship(Long id) {
        if (!internshipRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Internship not found");
        }
        internshipRepository.deleteById(id);
    }

    // ---- helpers ----

    private void applyRequest(Internship internship, CreateInternshipRequest request) {
        internship.setPositionTitle(request.getPositionTitle().trim());
        internship.setDepartment(request.getDepartment());
        internship.setAvailableSlots(request.getAvailableSlots());
        internship.setDuration(request.getDuration());
        internship.setStartDate(request.getStartDate());
        internship.setApplicationDeadline(request.getApplicationDeadline());
        internship.setJobDescription(request.getJobDescription().trim());
        internship.setRequiredSkills(request.getRequiredSkills());
        internship.setWorkSetup(request.getWorkSetup());
    }

    /**
     * Mirrors the validation already done client-side in CreateInternship.jsx,
     * enforced again here since the client checks can't be trusted alone.
     */
    private void validate(CreateInternshipRequest request) {
        if (request.getPositionTitle() == null || request.getPositionTitle().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Position title is required");
        }
        if (request.getDepartment() == null || request.getDepartment().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department is required");
        }
        if (request.getAvailableSlots() == null || request.getAvailableSlots() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least 1 slot is required");
        }
        if (request.getDuration() == null || request.getDuration().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duration is required");
        }
        if (request.getStartDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date is required");
        }
        if (request.getApplicationDeadline() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Application deadline is required");
        }
        if (request.getApplicationDeadline().isAfter(request.getStartDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Deadline must be on or before the start date");
        }
        if (request.getJobDescription() == null || request.getJobDescription().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Job description is required");
        }
        if (request.getJobDescription().length() > 600) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Job description must be under 600 characters");
        }
        if (request.getRequiredSkills() == null || request.getRequiredSkills().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one skill is required");
        }
        if (request.getWorkSetup() == null || request.getWorkSetup().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Work setup is required");
        }
    }
}
