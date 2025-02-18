package com.employeemanagement.service;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Project;
import java.util.List;

public interface EmployeeService {
    // -------------------- CRUD Operations --------------------
    List<Employee> findAll();
    Employee save(Employee employee);
    Employee findById(Long id);
    Employee updateEmployee(Long id, Employee employeeDetails);
    void deleteById(Long id);

    // -------------------- Project Operations --------------------
    List<Project> findProjectsByEmployeeId(Long employeeId);

    // -------------------- Auth Operations --------------------
    Employee findByEmail(String email);
    Employee findByUsername(String username);
}
