package com.example.ojtmanagementsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * You don't have JWT/session-based auth wired up yet, so this just:
 *  - opens up /api/** so your React app isn't blocked by the auto-generated
 *    login wall the security starter adds by default
 *  - turns off CSRF (it's for browser form/session logins, not a stateless
 *    JSON API like this one)
 *  - turns off the default form-login page and HTTP Basic popup
 *  - still gives you the PasswordEncoder bean AuthService needs
 *
 * IMPORTANT: this means every /api/** endpoint is currently open to anyone.
 * That's fine while you're building, but before this goes anywhere real,
 * this should be replaced with real authentication (JWT is the usual
 * choice for a React + Spring Boot REST API) so routes are actually
 * protected per-role (student/company/coordinator).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}