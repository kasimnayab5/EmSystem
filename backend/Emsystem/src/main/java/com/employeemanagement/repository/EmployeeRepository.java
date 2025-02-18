package com.employeemanagement.repository;

import com.employeemanagement.entity.Employee;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByCompanyEmail(String email);
    Optional<Employee> findByEmploymentCode(String code);
}
