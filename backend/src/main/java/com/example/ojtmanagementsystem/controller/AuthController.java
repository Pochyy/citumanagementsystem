package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.*;
import com.example.ojtmanagementsystem.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Wire up to RegisterScreen.jsx -> handleStudentRegisterSubmit
    @PostMapping("/register/student")
    public ResponseEntity<UserResponse> registerStudent(@RequestBody StudentRegisterRequest request) {
        UserResponse response = authService.registerStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Wire up to RegisterScreen.jsx -> handleCompanyRegisterSubmit
    @PostMapping("/register/company")
    public ResponseEntity<UserResponse> registerCompany(@RequestBody CompanyRegisterRequest request) {
        UserResponse response = authService.registerCompany(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Wire up to Login.jsx -> handleLoginSubmit
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request) {
        UserResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
