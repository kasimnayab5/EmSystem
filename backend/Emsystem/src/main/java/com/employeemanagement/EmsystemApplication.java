package com.employeemanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.employeemanagement.entity.Employee;
import com.employeemanagement.entity.Role;
import com.employeemanagement.entity.User;
import com.employeemanagement.repository.EmployeeRepository;
import com.employeemanagement.repository.UserRepository;

@SpringBootApplication
public class EmsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmsystemApplication.class, args);
	}
	
	 @Bean
	    public CommandLineRunner initData(
	        UserRepository userRepository,
	        EmployeeRepository employeeRepository,
	        PasswordEncoder passwordEncoder
	    ) {
	        return args -> {
	            // Check if the admin user already exists
	            if (!userRepository.findByCompanyEmail("admin@example.com").isPresent()) {
	                // Create Admin User
	                User adminUser = new User();
	                adminUser.setCompanyEmail("admin@example.com");
	                adminUser.setPassword(passwordEncoder.encode("admin123"));
	                adminUser.setRole(Role.ADMIN);
	                userRepository.save(adminUser);

	                // Create Admin Employee (linked to the User)
	                Employee adminEmployee = new Employee();
	                adminEmployee.setCompanyEmail("admin@example.com");
	                adminEmployee.setEmploymentCode("000001");
	                adminEmployee.setFullName("Admin User");
	                // Removed: adminEmployee.setRole(Role.ADMIN); // Role is now stored on the User entity
	                adminEmployee.setDateOfBirth("1990-01-01");
	                adminEmployee.setGender("Male");
	                adminEmployee.setCurrentAddress("123 Admin Street");
	                adminEmployee.setMobile("1234567890");
	                adminEmployee.setPersonalMail("admin@example.com");
	                adminEmployee.setEmergencyContactName("Emergency Contact");
	                adminEmployee.setEmergencyContactMobile("0987654321");
	                adminEmployee.setReportingManager("Super Admin");
	                adminEmployee.setHrName("HR Admin");
	                adminEmployee.setDateOfJoining("2020-01-01");
	                adminEmployee.setPanCard("ABCDE1234F");
	                adminEmployee.setAadharCard("123456789012");
	                adminEmployee.setBankName("Admin Bank");
	                adminEmployee.setBranch("Admin Branch");
	                adminEmployee.setIfscCode("ADMIN1234567");
	                adminEmployee.setCtcBreakup(100000.0);
	                adminEmployee.setPayslipPath("/payslips/admin.pdf");

	                // **NEW**: Set a non-null value for officePhone
	                adminEmployee.setOfficePhone("2210092288");

	                employeeRepository.save(adminEmployee);
	            }
	        };
	    }
}
