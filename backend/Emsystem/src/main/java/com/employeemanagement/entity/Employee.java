package com.employeemanagement.entity;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	@Column(unique = true, nullable = false)
    @Pattern(regexp = "^[0-9]{6}$", message = "Employment code must be a 6-digit number")
    private String employmentCode;

    public String getEmploymentCode() {
		return employmentCode;
	}

	public void setEmploymentCode(String employmentCode) {
		this.employmentCode = employmentCode;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public String getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPersonalMail() {
		return personalMail;
	}

	public void setPersonalMail(String personalMail) {
		this.personalMail = personalMail;
	}

	public String getEmergencyContactName() {
		return emergencyContactName;
	}

	public void setEmergencyContactName(String emergencyContactName) {
		this.emergencyContactName = emergencyContactName;
	}

	public String getEmergencyContactMobile() {
		return emergencyContactMobile;
	}

	public void setEmergencyContactMobile(String emergencyContactMobile) {
		this.emergencyContactMobile = emergencyContactMobile;
	}

	public String getCompanyEmail() {
		return companyEmail;
	}

	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}

	public String getOfficePhone() {
		return officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getReportingManager() {
		return reportingManager;
	}

	public void setReportingManager(String reportingManager) {
		this.reportingManager = reportingManager;
	}

	public String getHrName() {
		return hrName;
	}

	public void setHrName(String hrName) {
		this.hrName = hrName;
	}

	public String getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(String dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public List<String> getEmploymentHistory() {
		return employmentHistory;
	}

	public void setEmploymentHistory(List<String> employmentHistory) {
		this.employmentHistory = employmentHistory;
	}

	public String getPanCard() {
		return panCard;
	}

	public void setPanCard(String panCard) {
		this.panCard = panCard;
	}

	public String getAadharCard() {
		return aadharCard;
	}

	public void setAadharCard(String aadharCard) {
		this.aadharCard = aadharCard;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public double getCtcBreakup() {
		return ctcBreakup;
	}

	public void setCtcBreakup(double ctcBreakup) {
		this.ctcBreakup = ctcBreakup;
	}

	public String getPayslipPath() {
		return payslipPath;
	}

	public void setPayslipPath(String payslipPath) {
		this.payslipPath = payslipPath;
	}

	@Column(nullable = false)
    @NotBlank(message = "Full name is mandatory")
    private String fullName;

    @Column(nullable = false)
    @NotBlank(message = "Date of birth is mandatory")
    private String dateOfBirth;

    @Column(nullable = false)
    @NotBlank(message = "Gender is mandatory")
    private String gender;

    @Column(nullable = false)
    @NotBlank(message = "Current address is mandatory")
    private String currentAddress;

    private String permanentAddress;

    @Column(nullable = false)
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be a 10-digit number")
    private String mobile;

    @Column(nullable = false)
    @Email(message = "Email should be valid")
    private String personalMail;

    @Column(nullable = false)
    @NotBlank(message = "Emergency contact name is mandatory")
    private String emergencyContactName;

    @Column(nullable = false)
    @Pattern(regexp = "^[0-9]{10}$", message = "Emergency contact mobile must be a 10-digit number")
    private String emergencyContactMobile;

    // Professional Details
    @Column(nullable = false)
    @Email(message = "Company email should be valid")
    private String companyEmail;

    @Column(nullable = false)
    private String officePhone;

    @Column(nullable = false)
    private String reportingManager;

    @Column(nullable = false)
    private String hrName;

    @Column(nullable = false)
    private String dateOfJoining;

    @ElementCollection
    private List<String> employmentHistory;
    
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Project> projects;
    
    public List<Project> getProjects() {
        return projects;
    }
    
    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    // Finance Section
    @Column(nullable = false)
    private String panCard;

    @Column(nullable = false)
    private String aadharCard;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String branch;

    @Column(nullable = false)
    private String ifscCode;

    @Column(nullable = false)
    private double ctcBreakup;
    
    @Column(nullable = false)
    private String payslipPath;
}
