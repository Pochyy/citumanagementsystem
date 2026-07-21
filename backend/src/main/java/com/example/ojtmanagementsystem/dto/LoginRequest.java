package com.example.ojtmanagementsystem.dto;

/**
 * "login" can be either a Student ID (students) or an email (companies/
 * coordinators) - matches the single "Login" field on your Login.jsx form.
 */
public class LoginRequest {
    private String login;
    private String password;

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
