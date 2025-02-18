package com.employeemanagement.controller;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Role;
import com.employeemanagement.entity.User;
import com.employeemanagement.repository.EmployeeRepository;
import com.employeemanagement.repository.UserRepository;
import com.employeemanagement.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        // Check if user already exists
        if (userRepository.findByCompanyEmail(user.getCompanyEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        // Set default role if not provided
        if (user.getRole() == null) {
            user.setRole(Role.EMPLOYEE);
        }

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user
        User registeredUser = userRepository.save(user);
        return ResponseEntity.ok(registeredUser);
    }
 // UserController.java - Add proper user-employee linking
		    @PostMapping("/employees")
		    public ResponseEntity<?> createEmployee(@Valid @RequestBody Employee employee, 
		                                          @RequestParam String companyEmail) {
		        User user = userRepository.findByCompanyEmail(companyEmail)
		                .orElseThrow(() -> new RuntimeException("User not found"));
		        
		        employee.setUser(user); // Link user to employee
		        return ResponseEntity.ok(employeeRepository.save(employee));
		    }
			public UserService getUserService() {
				return userService;
			}
			
			@PutMapping("/update-role")
			public ResponseEntity<User> updateUserRole(@RequestParam String companyEmail, 
			                                         @RequestParam Role newRole) {
			    User user = userRepository.findByCompanyEmail(companyEmail)
			        .orElseThrow();
			    user.setRole(newRole);
			    return ResponseEntity.ok(userRepository.save(user));
			}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}