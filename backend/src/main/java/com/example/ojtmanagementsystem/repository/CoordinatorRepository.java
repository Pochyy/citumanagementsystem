package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Coordinator;
import com.example.ojtmanagementsystem.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoordinatorRepository extends JpaRepository<Coordinator, Long> {
    Optional<Coordinator> findByUser_UserId(Long userId);
    Optional<Coordinator> findFirstByUser_Role(Role role);
}
