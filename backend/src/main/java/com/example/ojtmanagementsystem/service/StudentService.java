package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.StudentProfileResponse;
import com.example.ojtmanagementsystem.dto.UserUpdateRequest;
import com.example.ojtmanagementsystem.entity.Student;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.repository.StudentRepository;
import com.example.ojtmanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentService(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public StudentProfileResponse getProfile(String studentId) {
        Student student = findStudentOrThrow(studentId);
        return StudentProfileResponse.fromEntity(student);
    }

    @Transactional
    public StudentProfileResponse updateProfile(String studentId, UserUpdateRequest request) {
        Student student = findStudentOrThrow(studentId);
        User user = student.getUser();

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());

        if (request.getPhoneNumber() != null) student.setPhoneNumber(request.getPhoneNumber());
        if (request.getDateOfBirth() != null) student.setDateOfBirth(request.getDateOfBirth());
        if (request.getAddress() != null) student.setAddress(request.getAddress());
        if (request.getProgram() != null) student.setProgram(request.getProgram());
        if (request.getYearLevel() != null) student.setYearLevel(request.getYearLevel());
        if (request.getDepartment() != null) student.setDepartment(request.getDepartment());

        userRepository.save(user);
        studentRepository.save(student);

        return StudentProfileResponse.fromEntity(student);
    }

    private Student findStudentOrThrow(String studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("No student found with id: " + studentId));
    }
}