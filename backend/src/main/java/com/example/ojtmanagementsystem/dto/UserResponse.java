package com.example.ojtmanagementsystem.dto;

import com.example.ojtmanagementsystem.entity.Role;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.entity.UserStatus;

import java.time.LocalDateTime;

/** Safe view of a User to send back to the frontend - password excluded. */
public class UserResponse {
    private Long userId;
    private String studentId; // null for non-student users (COMPANY, COORDINATOR)
    private Long companyId; // null for non-company users
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private UserStatus status;
    private LocalDateTime dateCreated;

    public static UserResponse fromEntity(User user) {
        UserResponse dto = new UserResponse();
        dto.userId = user.getUserId();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.email = user.getEmail();
        dto.role = user.getRole();
        dto.status = user.getStatus();
        dto.dateCreated = user.getDateCreated();
        return dto;
    }

    // Overload used when we already resolved the Student (e.g. during login)
    public static UserResponse fromEntity(User user, String studentId) {
        return fromEntity(user, studentId, null);
    }

    public static UserResponse fromEntity(User user, String studentId, Long companyId) {
        UserResponse dto = fromEntity(user);
        dto.studentId = studentId;
        dto.companyId = companyId;
        return dto;
    }

    public Long getUserId() { return userId; }
    public String getStudentId() { return studentId; }
    public Long getCompanyId() { return companyId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public UserStatus getStatus() { return status; }
    public LocalDateTime getDateCreated() { return dateCreated; }
}
