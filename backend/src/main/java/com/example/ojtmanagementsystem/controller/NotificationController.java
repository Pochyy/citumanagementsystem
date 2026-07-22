package com.example.ojtmanagementsystem.controller;

import com.example.ojtmanagementsystem.entity.Notification;
import com.example.ojtmanagementsystem.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<Notification> getAllForUser(@PathVariable Long userId) {
        return notificationService.getAllForUser(userId);
    }

    @GetMapping("/user/{userId}/unread")
    public List<Notification> getUnreadForUser(@PathVariable Long userId) {
        return notificationService.getUnreadForUser(userId);
    }

    @GetMapping("/{id}")
    public Notification getById(@PathVariable Long id) {
        return notificationService.getById(id);
    }

    @GetMapping("/user/{userId}/unread-count")
    public Map<String, Long> getUnreadCount(@PathVariable Long userId) {
        return Map.of("count", notificationService.getUnreadCount(userId));
    }

    @PatchMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return notificationService.markAsRead(id);
    }

    @PatchMapping("/user/{userId}/read-all")
    public void markAllAsRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}