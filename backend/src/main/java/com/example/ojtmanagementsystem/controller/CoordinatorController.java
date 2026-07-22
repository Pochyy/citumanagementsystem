package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.dto.CoordinatorActivityResponse;
import com.example.ojtmanagementsystem.dto.CoordinatorProfileRequest;
import com.example.ojtmanagementsystem.dto.CoordinatorProfileResponse;
import com.example.ojtmanagementsystem.service.CoordinatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coordinator")
@CrossOrigin(origins = "http://localhost:3000")
public class CoordinatorController {

    private final CoordinatorService coordinatorService;

    public CoordinatorController(CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    @GetMapping
    public ResponseEntity<CoordinatorProfileResponse> getCoordinatorProfile() {
        return ResponseEntity.ok(coordinatorService.getCoordinatorProfile());
    }

    @GetMapping("/activity")
    public ResponseEntity<List<CoordinatorActivityResponse>> getRecentActivity() {
        return ResponseEntity.ok(coordinatorService.getRecentActivity());
    }

    @PutMapping
    public ResponseEntity<CoordinatorProfileResponse> updateCoordinatorProfile(@RequestBody CoordinatorProfileRequest request) {
        return ResponseEntity.ok(coordinatorService.updateCoordinatorProfile(request));
    }
}
