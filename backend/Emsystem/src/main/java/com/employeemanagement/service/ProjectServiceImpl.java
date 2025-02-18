package com.employeemanagement.service;

import com.employeemanagement.entity.Project;
import com.employeemanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll(); // For admins
    }

    @Override
    public Project save(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }
    
    @Override
    public List<Project> findByAssignedEmployeeCompanyEmail(String companyEmail) {
        // Delegate to the repository method that finds projects by the employee's company email.
        return projectRepository.findByEmployeeCompanyEmail(companyEmail);
    }
    @Override
    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }
}
