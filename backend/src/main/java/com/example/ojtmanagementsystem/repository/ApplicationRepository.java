package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
