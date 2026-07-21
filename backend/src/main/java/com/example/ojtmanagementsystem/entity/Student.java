    package com.example.ojtmanagementsystem.entity;

    import jakarta.persistence.*;
    import java.time.LocalDate;

    @Entity
    @Table(name = "students")
    public class Student {

        @Id
        @Column(name = "student_id")
        private String studentId;

        @OneToOne
        @JoinColumn(name = "user_id", nullable = false, unique = true)
        private User user;

        @Column(name = "phone_number")
        private String phoneNumber;

        @Column(name = "date_of_birth")
        private LocalDate dateOfBirth;

        @Column(name = "address")
        private String address;

        @Column(name = "program")
        private String program;

        @Column(name = "year_level")
        private String yearLevel;

        @Column(name = "department")
        private String department;

        public Student() {}

        public Student(String studentId, User user) {
            this.studentId = studentId;
            this.user = user;
        }

        public String getStudentId() { return studentId; }
        public void setStudentId(String studentId) { this.studentId = studentId; }

        public User getUser() { return user; }
        public void setUser(User user) { this.user = user; }

        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

        public LocalDate getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getProgram() { return program; }
        public void setProgram(String program) { this.program = program; }

        public String getYearLevel() { return yearLevel; }
        public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
    }