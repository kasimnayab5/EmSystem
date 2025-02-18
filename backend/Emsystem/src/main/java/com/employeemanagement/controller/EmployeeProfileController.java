package com.employeemanagement.controller;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.exception.ResourceNotFoundException;
import com.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/employee-profile")
public class EmployeeProfileController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<?> getEmployeeProfile(Authentication authentication) {
        // Retrieve the authenticated user's company email from the authentication context.
        String companyEmail = authentication.getName();
        try {
            // Fetch the complete employee profile by company email.
            Employee employee = employeeService.findByEmail(companyEmail);
            
            // Check if the returned profile is complete (e.g., has a non-null id).
            if (employee == null || employee.getId() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Employee profile not found or incomplete"));
            }
            
            // Return the complete employee profile.
            return ResponseEntity.ok(employee);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred while retrieving the employee profile"));
        }
    }
}
