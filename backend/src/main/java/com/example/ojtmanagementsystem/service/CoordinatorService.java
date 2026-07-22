package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.CoordinatorActivityResponse;
import com.example.ojtmanagementsystem.dto.CoordinatorProfileRequest;
import com.example.ojtmanagementsystem.dto.CoordinatorProfileResponse;
import com.example.ojtmanagementsystem.entity.Coordinator;
import com.example.ojtmanagementsystem.entity.Role;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.repository.CoordinatorRepository;
import com.example.ojtmanagementsystem.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CoordinatorService {

    private final CoordinatorRepository coordinatorRepository;
    private final UserRepository userRepository;

    public CoordinatorService(CoordinatorRepository coordinatorRepository, UserRepository userRepository) {
        this.coordinatorRepository = coordinatorRepository;
        this.userRepository = userRepository;
    }

    public CoordinatorProfileResponse getCoordinatorProfile() {
        Coordinator coordinator = findCoordinatorOrThrow();
        return mapToResponse(coordinator);
    }

    public List<CoordinatorActivityResponse> getRecentActivity() {
        return List.of(
            new CoordinatorActivityResponse(1, "verified", "You", "verified a document for Mark Villaceran", "2 hours ago"),
            new CoordinatorActivityResponse(2, "student", "You", "added Jose Adiawan to Globe Telecom", "5 hours ago"),
            new CoordinatorActivityResponse(3, "company", "PLDT", "submitted a partnership application", "Yesterday"),
            new CoordinatorActivityResponse(4, "completed", "Maria Marie", "completed her OJT hours", "2 days ago")
        );
    }

    public CoordinatorProfileResponse updateCoordinatorProfile(CoordinatorProfileRequest request) {
        Coordinator coordinator = findCoordinatorOrThrow();
        User user = coordinator.getUser();

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            if (!request.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "This email is already registered.");
            }
            user.setEmail(request.getEmail());
        }

        coordinator.setAddress(request.getAddress());
        coordinator.setPhone(request.getPhone());
        coordinator.setDepartment(request.getDepartment());
        coordinator.setOfficeHours(request.getOfficeHours());
        coordinator.setProgram(request.getProgram());
        coordinator.setYearAssigned(request.getYearAssigned());
        coordinator.setCampus(request.getCampus());

        userRepository.save(user);
        coordinatorRepository.save(coordinator);

        return mapToResponse(coordinator);
    }

    private Coordinator findCoordinatorOrThrow() {
        return coordinatorRepository.findFirstByUser_Role(Role.COORDINATOR)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Coordinator account not found."));
    }

    private CoordinatorProfileResponse mapToResponse(Coordinator coordinator) {
        User user = coordinator.getUser();

        CoordinatorProfileResponse response = new CoordinatorProfileResponse();

        CoordinatorProfileResponse.Profile profile = new CoordinatorProfileResponse.Profile();
        String fullName = buildFullName(user.getFirstName(), user.getLastName());
        profile.setFullName(fullName);
        profile.setId("COORD-" + user.getUserId());
        profile.setStatus(user.getStatus().name());
        profile.setEmail(user.getEmail());
        profile.setAddress(coordinator.getAddress());
        profile.setPhone(coordinator.getPhone());
        profile.setDepartment(coordinator.getDepartment());
        profile.setOfficeHours(coordinator.getOfficeHours());

        CoordinatorProfileResponse.Stats stats = new CoordinatorProfileResponse.Stats();
        stats.setStudentsHandled(coordinator.getStudentsHandled());
        stats.setCompaniesManaged(coordinator.getCompaniesManaged());
        stats.setDocsVerified(coordinator.getDocsVerified());

        CoordinatorProfileResponse.Academic academic = new CoordinatorProfileResponse.Academic();
        academic.setProgram(coordinator.getProgram());
        academic.setYearAssigned(coordinator.getYearAssigned());
        academic.setCampus(coordinator.getCampus());

        response.setProfile(profile);
        response.setStats(stats);
        response.setAcademic(academic);
        return response;
    }

    private String buildFullName(String firstName, String lastName) {
        if (firstName == null && lastName == null) {
            return "";
        }
        if (firstName == null) {
            return lastName;
        }
        if (lastName == null) {
            return firstName;
        }
        return firstName + " " + lastName;
    }
}
