package com.employeemanagement.service;

import com.employeemanagement.entity.User;
import com.employeemanagement.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByEmail(String companyEmail) {
        return userRepository.findByCompanyEmail(companyEmail)
                .orElseThrow(() -> new RuntimeException("User not found with companyEmail: " + companyEmail));
    }
}