package com.employeemanagement.service;

import com.employeemanagement.entity.Project;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    List<Project> findAll();
    Project save(Project project);
    void deleteById(Long id);
    
    // New method for fetching projects by the employee's company email.
    List<Project> findByAssignedEmployeeCompanyEmail(String companyEmail);
    
    Optional<Project> findById(Long id);
}
