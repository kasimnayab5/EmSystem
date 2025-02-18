package com.employeemanagement.controller;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Project;
import com.employeemanagement.exception.ResourceNotFoundException;
import com.employeemanagement.service.EmployeeService;
import com.employeemanagement.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ProjectService projectService;

    // Admin-only endpoint: Create a project and assign it to an employee
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project) {
        try {
            System.out.println("Received Project: " + project); // Debugging log
            
            if (project.getEmployee() == null || project.getEmployee().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Employee ID is missing in request"));
            }

            // Fetch employee ID from the request body
            Long employeeId = project.getEmployee().getId();
            System.out.println("Received Employee ID: " + employeeId); // Debugging log

            // Validate employee
            Employee employee = employeeService.findById(employeeId);
            if (employee == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Invalid employeeId: " + employeeId));
            }

            // Assign employee to project
            project.setEmployee(employee);
            Project savedProject = projectService.save(project);
            return ResponseEntity.ok(savedProject);
        } catch (Exception ex) {
            ex.printStackTrace(); // Print full stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create project"));
        }
    }

    // Admin-only endpoint: Fetch all projects
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Project> getAllProjects() {
        return projectService.findAll();
    }

    // Admin-only endpoint: Fetch a single project by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return ResponseEntity.ok(project);
    }

    // Admin-only endpoint: Update a project
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @Valid @RequestBody Project projectDetails) {
        try {
            Project existingProject = projectService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

            // Update project fields
            existingProject.setProjectCode(projectDetails.getProjectCode());
            existingProject.setProjectName(projectDetails.getProjectName());
            existingProject.setClientName(projectDetails.getClientName());
            existingProject.setStartDate(projectDetails.getStartDate());
            existingProject.setEndDate(projectDetails.getEndDate());
            existingProject.setReportingManager(projectDetails.getReportingManager());

            // Update assigned employee if provided
            if (projectDetails.getEmployee() != null && projectDetails.getEmployee().getId() != null) {
                Employee employee = employeeService.findById(projectDetails.getEmployee().getId());
                if (employee == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Map.of("error", "Invalid employeeId: " + projectDetails.getEmployee().getId()));
                }
                existingProject.setEmployee(employee);
            }

            Project updatedProject = projectService.save(existingProject);
            return ResponseEntity.ok(updatedProject);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update project"));
        }
    }

    // Employee-only endpoint: Fetch projects assigned to the logged-in employee
    @GetMapping("/my-projects")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<Project> getMyProjects(Authentication authentication) {
        // Get the logged-in employee's company email from the authentication context.
        String companyEmail = authentication.getName();
        return projectService.findByAssignedEmployeeCompanyEmail(companyEmail);
    }

    // Admin-only endpoint: Delete a project
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}