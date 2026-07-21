package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.StudentProfileResponse;
import com.example.ojtmanagementsystem.dto.UserUpdateRequest;
import com.example.ojtmanagementsystem.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentProfileResponse> getProfile(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.getProfile(studentId));
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<StudentProfileResponse> updateProfile(
            @PathVariable String studentId,
            @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(studentService.updateProfile(studentId, request));
    }
}