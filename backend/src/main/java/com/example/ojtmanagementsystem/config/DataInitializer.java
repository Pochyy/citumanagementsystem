package com.example.ojtmanagementsystem.config;

import com.example.ojtmanagementsystem.entity.Coordinator;
import com.example.ojtmanagementsystem.entity.Role;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.entity.UserStatus;
import com.example.ojtmanagementsystem.repository.CoordinatorRepository;
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
            }
        };
    }

    private boolean isPasswordEncoded(String password) {
        return password.startsWith("$2a$")
                || password.startsWith("$2b$")
                || password.startsWith("$2y$")
                || password.startsWith("$argon2$");
    }
}
