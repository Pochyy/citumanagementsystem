package com.example.ojtmanagementsystem.repository;

import com.example.ojtmanagementsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
