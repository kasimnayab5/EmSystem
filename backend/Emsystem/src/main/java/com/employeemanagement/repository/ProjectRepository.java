package com.employeemanagement.repository;

import com.employeemanagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // For admins: Fetch all projects
    List<Project> findAll();

    // For employees: Fetch projects assigned to a specific employee
    List<Project> findByEmployeeCompanyEmail(String companyEmail);
}

