package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.*;
import com.example.ojtmanagementsystem.entity.*;
import com.example.ojtmanagementsystem.repository.CompanyRepository;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import com.example.ojtmanagementsystem.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                        StudentRepository studentRepository,
                        CompanyRepository companyRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------------- REGISTER: STUDENT ----------------
    public UserResponse registerStudent(StudentRegisterRequest request) {
        if (request.getStudentId() == null || request.getStudentId().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student ID is required.");
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords do not match.");
        }
        if (studentRepository.existsById(request.getStudentId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This Student ID is already registered.");
        }

        // FirstName/LastName/Email are left NULL here and filled in later
        // from the student's Profile page, as described in your design.
        User user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);
        user.setStatus(UserStatus.ACTIVE);
        user = userRepository.save(user);

        Student student = new Student(request.getStudentId(), user);
        studentRepository.save(student);

        return UserResponse.fromEntity(user);
    }

    // ---------------- REGISTER: COMPANY ----------------
    public UserResponse registerCompany(CompanyRegisterRequest request) {
        if (request.getCompanyEmail() == null || request.getCompanyEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Company email is required.");
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords do not match.");
        }
        if (userRepository.existsByEmail(request.getCompanyEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This email is already registered.");
        }

        User user = new User();
        user.setEmail(request.getCompanyEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.COMPANY);
        // Company accounts start pending until the Coordinator verifies documents.
        user.setStatus(UserStatus.PENDING_REVIEW);
        user = userRepository.save(user);

        Company company = new Company(user, request.getCompanyName());
        companyRepository.save(company);

        return UserResponse.fromEntity(user);
    }

    // ---------------- LOGIN ----------------
    public UserResponse login(LoginRequest request) {
        if (request.getLogin() == null || request.getPassword() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Login and password are required.");
        }

        // Try as a Student ID first
        Optional<Student> studentMatch = studentRepository.findById(request.getLogin());
        User user;
        if (studentMatch.isPresent()) {
            user = studentMatch.get().getUser();
        } else {
            // Fall back to email (company / coordinator)
            user = userRepository.findByEmail(request.getLogin())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials."));
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials.");
        }
        if (user.getStatus() == UserStatus.SUSPENDED || user.getStatus() == UserStatus.INACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This account is " + user.getStatus() + ".");
        }

        return UserResponse.fromEntity(user);
    }
}
