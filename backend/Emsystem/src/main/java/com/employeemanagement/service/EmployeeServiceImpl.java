package com.employeemanagement.service;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Project;
import com.employeemanagement.exception.ResourceNotFoundException;
import com.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // -------------------- CRUD Operations --------------------
    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = findById(id); // Throws ResourceNotFoundException if not found

        // Update employee fields
        employee.setEmploymentCode(employeeDetails.getEmploymentCode());
        employee.setFullName(employeeDetails.getFullName());
        employee.setDateOfBirth(employeeDetails.getDateOfBirth());
        employee.setGender(employeeDetails.getGender());
        employee.setCurrentAddress(employeeDetails.getCurrentAddress());
        employee.setPermanentAddress(employeeDetails.getPermanentAddress());
        employee.setMobile(employeeDetails.getMobile());
        employee.setPersonalMail(employeeDetails.getPersonalMail());
        employee.setEmergencyContactName(employeeDetails.getEmergencyContactName());
        employee.setEmergencyContactMobile(employeeDetails.getEmergencyContactMobile());
        employee.setCompanyEmail(employeeDetails.getCompanyEmail());
        employee.setOfficePhone(employeeDetails.getOfficePhone());
        employee.setReportingManager(employeeDetails.getReportingManager());
        employee.setHrName(employeeDetails.getHrName());
        employee.setDateOfJoining(employeeDetails.getDateOfJoining());
        employee.setEmploymentHistory(employeeDetails.getEmploymentHistory());
        employee.setPanCard(employeeDetails.getPanCard());
        employee.setAadharCard(employeeDetails.getAadharCard());
        employee.setBankName(employeeDetails.getBankName());
        employee.setBranch(employeeDetails.getBranch());
        employee.setIfscCode(employeeDetails.getIfscCode());
        employee.setCtcBreakup(employeeDetails.getCtcBreakup());
        employee.setPayslipPath(employeeDetails.getPayslipPath());
        employee.setProjects(employeeDetails.getProjects());

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteById(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // -------------------- Project Operations --------------------
    @Override
    public List<Project> findProjectsByEmployeeId(Long employeeId) {
        Employee employee = findById(employeeId); // Throws ResourceNotFoundException
        return employee.getProjects(); // Ensure Employee entity has a getProjects() method
    }

    // -------------------- Auth Operations --------------------
    @Override
    public Employee findByEmail(String email) {
        return employeeRepository.findByCompanyEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with email: " + email));
    }

    @Override
    public Employee findByUsername(String username) {
        if (username.contains("@")) {
            return findByEmail(username);
        } else {
            return employeeRepository.findByEmploymentCode(username)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with code: " + username));
        }
    }
}