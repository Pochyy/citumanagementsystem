package com.example.ojtmanagementsystem.config;

import com.example.ojtmanagementsystem.entity.Coordinator;
import com.example.ojtmanagementsystem.entity.RequirementDefinition;
import com.example.ojtmanagementsystem.entity.Role;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.entity.UserStatus;
import com.example.ojtmanagementsystem.repository.CoordinatorRepository;
import com.example.ojtmanagementsystem.repository.RequirementDefinitionRepository;
import com.example.ojtmanagementsystem.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedCoordinator(UserRepository userRepository,
                                             CoordinatorRepository coordinatorRepository,
                                             PasswordEncoder passwordEncoder) {
        return args -> {
            var existingCoordinator = userRepository.findByEmail("coordinator@citu.edu");
            if (existingCoordinator.isEmpty()) {
                User coordinatorUser = new User();
                coordinatorUser.setEmail("coordinator@citu.edu");
                coordinatorUser.setPassword(passwordEncoder.encode("123456"));
                coordinatorUser.setRole(Role.COORDINATOR);
                coordinatorUser.setStatus(UserStatus.ACTIVE);
                coordinatorUser.setFirstName("Cebu");
                coordinatorUser.setLastName("Coordinator");

                User savedUser = userRepository.save(coordinatorUser);
                Coordinator coordinator = new Coordinator(savedUser);
                coordinator.setDepartment("College of Computer Studies");
                coordinator.setOfficeHours("Mon–Fri, 9:00 AM – 5:00 PM");
                coordinator.setPhone("+63 917 123 4567");
                coordinator.setAddress("Cebu City, Philippines");
                coordinator.setProgram("Bachelor of Science in Information Technology");
                coordinator.setYearAssigned("2024 – 2025");
                coordinator.setCampus("CIT-U Main Campus");
                coordinator.setStudentsHandled(89);
                coordinator.setCompaniesManaged(35);
                coordinator.setDocsVerified(156);

                coordinatorRepository.save(coordinator);
            } else {
                User existingUser = existingCoordinator.get();
                String currentPassword = existingUser.getPassword();
                if (currentPassword != null && !isPasswordEncoded(currentPassword)) {
                    existingUser.setPassword(passwordEncoder.encode(currentPassword));
                    userRepository.save(existingUser);
                }

                // Backfill coordinator profile fields if they were added after the account was created
                coordinatorRepository.findByUser_UserId(existingUser.getUserId()).ifPresent(coordinator -> {
                    boolean needsUpdate = false;

                    if (isBlank(coordinator.getDepartment())) {
                        coordinator.setDepartment("College of Computer Studies");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getOfficeHours())) {
                        coordinator.setOfficeHours("Mon–Fri, 9:00 AM – 5:00 PM");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getPhone())) {
                        coordinator.setPhone("+63 917 123 4567");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getAddress())) {
                        coordinator.setAddress("Cebu City, Philippines");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getProgram())) {
                        coordinator.setProgram("Bachelor of Science in Information Technology");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getYearAssigned())) {
                        coordinator.setYearAssigned("2024 – 2025");
                        needsUpdate = true;
                    }
                    if (isBlank(coordinator.getCampus())) {
                        coordinator.setCampus("CIT-U Main Campus");
                        needsUpdate = true;
                    }
                    if (coordinator.getStudentsHandled() == null) {
                        coordinator.setStudentsHandled(89);
                        needsUpdate = true;
                    }
                    if (coordinator.getCompaniesManaged() == null) {
                        coordinator.setCompaniesManaged(35);
                        needsUpdate = true;
                    }
                    if (coordinator.getDocsVerified() == null) {
                        coordinator.setDocsVerified(156);
                        needsUpdate = true;
                    }

                    if (needsUpdate) {
                        coordinatorRepository.save(coordinator);
                    }
                });
            }

        };
    }

    @Bean
    public CommandLineRunner seedRequirementDefinitions(RequirementDefinitionRepository requirementDefinitionRepository) {
        return args -> {
            if (requirementDefinitionRepository.count() == 0) {
                requirementDefinitionRepository.save(new RequirementDefinition(
                    "Resume / CV", "Updated resume with complete educational and work experience"));
                requirementDefinitionRepository.save(new RequirementDefinition(
                    "Endorsement Letter", "Signed endorsement letter from your school coordinator"));
                requirementDefinitionRepository.save(new RequirementDefinition(
                    "Certificate of Good Moral", "Certificate issued within the last 6 months"));
            }
        };
    }

    private boolean isPasswordEncoded(String password) {
        return password.startsWith("$2a$")
                || password.startsWith("$2b$")
                || password.startsWith("$2y$")
                || password.startsWith("$argon2$");
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}