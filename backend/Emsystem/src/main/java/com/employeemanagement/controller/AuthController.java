package com.employeemanagement.controller;

import com.employeemanagement.dto.LoginRequest;
import com.employeemanagement.entity.Role;
import com.employeemanagement.entity.User;
import com.employeemanagement.repository.UserRepository;
import com.employeemanagement.security.JwtUtils;
import com.employeemanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Check if user already exists
            if (userRepository.findByCompanyEmail(user.getCompanyEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "User already exists"));
            }

            // Force EMPLOYEE role
            user.setRole(Role.EMPLOYEE);

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Save user
            User savedUser = userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                "message", "Registration successful",
                "companyEmail", savedUser.getCompanyEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Registration failed: " + e.getMessage()));
        }
    }

    // Login endpoint: Authenticate and return access token, refresh token, role, companyEmail, and userId.
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getCompanyEmail().trim(),
                    loginRequest.getPassword().trim()
                )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String accessToken = jwtUtils.generateToken(authentication);
            String refreshToken = jwtUtils.generateRefreshToken(authentication);

            User user = userService.findByEmail(loginRequest.getCompanyEmail().trim());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Collections.singletonMap("error", "User not found"));
            }

            return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "role", user.getRole().name(),
                "companyEmail", user.getCompanyEmail(),
                "userId", user.getId()
            ));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Invalid companyEmail or password"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Authentication failed"));
        }
    }

    // Refresh endpoint: Accept a refresh token and return a new access token.
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        try {
            String refreshToken = request.get("refreshToken");
            String newAccessToken = jwtUtils.refreshToken(refreshToken);
            return ResponseEntity.ok(Collections.singletonMap("accessToken", newAccessToken));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Invalid or expired refresh token"));
        }
    }
}
