package com.example.ojtmanagementsystem.service;

import com.example.ojtmanagementsystem.dto.UserResponse;
import com.example.ojtmanagementsystem.dto.UserUpdateRequest;
import com.example.ojtmanagementsystem.entity.User;
import com.example.ojtmanagementsystem.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // READ - all
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::fromEntity)
                .toList();
    }

    // READ - one
    public UserResponse getUserById(Long userId) {
        User user = findUserOrThrow(userId);
        return UserResponse.fromEntity(user);
    }

    // UPDATE - e.g. filling in FirstName/LastName from the profile page
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = findUserOrThrow(userId);

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());

        User saved = userRepository.save(user);
        return UserResponse.fromEntity(saved);
    }

    // DELETE
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
        userRepository.deleteById(userId);
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }
}
