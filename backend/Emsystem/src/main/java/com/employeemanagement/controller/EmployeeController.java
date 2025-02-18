package com.employeemanagement.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Project;
import com.employeemanagement.entity.User;
import com.employeemanagement.repository.EmployeeRepository;
import com.employeemanagement.repository.UserRepository;
import com.employeemanagement.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAllEmployees() {
        return employeeService.findAll();
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEmployee(@Valid @RequestBody Employee employee, 
                                            @RequestParam(required = false) String companyEmail) {
        try {
            User user;
            if (companyEmail != null) {
                // For admin-created employees
                user = userRepository.findByCompanyEmail(companyEmail)
                        .orElseThrow(() -> new RuntimeException("User not found for email: " + companyEmail));
            } else {
                // For self-registered employees
                user = userRepository.findByCompanyEmail(employee.getCompanyEmail())
                        .orElseThrow(() -> new RuntimeException("User not found for email: " + employee.getCompanyEmail()));
            }

            employee.setUser(user);
            Employee savedEmployee = employeeService.save(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create employee: " + e.getMessage());
        }
    }
    
    @GetMapping("/by-email/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email) {
        Employee employee = employeeRepository.findByCompanyEmail(email)
            .orElseThrow();
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        userRepository.deleteById(employee.getUser().getId());
        employeeService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        return ResponseEntity.ok(employee);
    }
    
    @GetMapping("/{id}/projects")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<Project>> getEmployeeProjects(@PathVariable Long id) {
        List<Project> projects = employeeService.findProjectsByEmployeeId(id);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}/payslip")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<FileSystemResource> downloadPayslip(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        String payslipPath = employee.getPayslipPath();

        File file = new File(payslipPath);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(new FileSystemResource(file));
    }

	public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}
}
