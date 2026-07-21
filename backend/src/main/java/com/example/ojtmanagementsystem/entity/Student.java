package com.example.ojtmanagementsystem.entity;

import jakarta.persistence.*;

/**
 * Student-specific data. studentId is the school-issued ID and is what the
 * student logs in with (not email). One-to-one link back to the User row
 * that holds the actual credentials/status.
 */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(name = "student_id")
    private String studentId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public Student() {}

    public Student(String studentId, User user) {
        this.studentId = studentId;
        this.user = user;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
