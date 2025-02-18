import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminCreateEmployee.css'

const AdminCreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'EMPLOYEE', // Default role
    employmentCode: '',
    fullName: '',
    companyEmail: '',
    personalMail: '',
    mobile: '',
    reportingManager: '',
    officePhone: '',
    panCard: '',
    aadharCard: '',
    dateOfBirth: '',
    hrName: '',
    gender: '',
    currentAddress: '',
    emergencyContactName: '',
    emergencyContactMobile: '',
    dateOfJoining: '',
    bankName: '',
    branch: '',
    ifscCode: '',
    ctcBreakup: '',
    password: '',
    payslipPath: '/default/path',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Register the user first
      await api.post('/api/auth/register', {
        companyEmail: formData.companyEmail,
        password: formData.password,
        role: formData.role,
      });

      // Create the employee profile
      const { password, role, ...employeeData } = formData;
      await api.post(`/api/employees?companyEmail=${formData.companyEmail}`, employeeData);

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Creation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='admin-create-container'>
    <form onSubmit={handleSubmit} >

        <div >
        <button 
          type="button" 
          className="transparent-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        </div>

      <h1>Create Employee</h1>
    <div className="form-group">
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Employment Code */}
      <div className="form-group">
        <label>Employment Code:</label>
        <input
          type="number"
          name="employmentCode"
          value={formData.employmentCode}
          onChange={handleChange}
          required
        />
      </div>

      {/* Company Email */}
      <div className="form-group">
        <label>Company Email:</label>
        <input
          type="email"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleChange}
          required
        />
      </div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      <div className="form-group">
      
      </div>

      {/* Personal Email */}
      <div className="form-group">
        <label>Personal Email:</label>
        <input
          type="email"
          name="personalMail"
          value={formData.personalMail}
          onChange={handleChange}
          required
        />
      </div>

      {/* Mobile */}
      <div className="form-group">
        <label>Mobile:</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      {/* Reporting Manager */}
      <div className="form-group">
        <label>Reporting Manager:</label>
        <input
          type="text"
          name="reportingManager"
          value={formData.reportingManager}
          onChange={handleChange}
          required
        />
      </div>

      {/* HR Name */}
      <div className="form-group">
        <label>HR Name:</label>
        <input
          type="text"
          name="hrName"
          value={formData.hrName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Office Phone */}
      <div className="form-group">
        <label>Office Phone:</label>
        <input
          type="tel"
          name="officePhone"
          value={formData.officePhone}
          onChange={handleChange}
          required
        />
      </div>

      {/* PAN Card */}
      <div className="form-group">
        <label>PAN Card:</label>
        <input
          type="text"
          name="panCard"
          value={formData.panCard}
          onChange={handleChange}
          required
        />
      </div>

      {/* Aadhar Card */}
      <div className="form-group">
        <label>Aadhar Card:</label>
        <input
          type="text"
          name="aadharCard"
          value={formData.aadharCard}
          onChange={handleChange}
          required
        />
      </div>

      {/* Date of Birth using react-datepicker */}
      <div className="form-group">
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
      </div>

      {/* Gender (using a select) */}
      <div className="form-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Current Address */}
      <div className="form-group">
        <label>Current Address:</label>
        <input
          type="text"
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleChange}
          required
        />
      </div>

      {/* Emergency Contact Name */}
      <div className="form-group">
        <label>Emergency Contact Name:</label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Emergency Contact Mobile */}
      <div className="form-group">
        <label>Emergency Contact Mobile:</label>
        <input
          type="tel"
          name="emergencyContactMobile"
          value={formData.emergencyContactMobile}
          onChange={handleChange}
          required
        />
      </div>

      {/* Date of Joining using react-datepicker */}
      <div className="form-group">
        <label>Date of Joining:</label>
        <input type="date" name="dateOfJoining" value={formData.dateOfJoiningy} onChange={handleChange} required />
        </div>

      {/* Bank Name */}
      <div className="form-group">
        <label>Bank Name:</label>
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Branch */}
      <div className="form-group">
        <label>Branch:</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
      </div>

      {/* IFSC Code */}
      <div className="form-group">
        <label>IFSC Code:</label>
        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          required
        />
      </div>

      {/* CTC Breakup */}
      <div className="form-group">
        <label>CTC Breakup:</label>
        <input
          type="number"
          name="ctcBreakup"
          value={formData.ctcBreakup}
          onChange={handleChange}
          required
        />
      </div>

      {/* Payslip Path */}
      <div className="form-group">
        <label>Payslip Path:</label>
        <input
          type="text"
          name="payslipPath"
          value={formData.payslipPath}
          onChange={handleChange}
          required
        />
      </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Employee'}
          </button>
      {error && <p className="error-message" >{error}</p>}
    </form>
    </div>
  );
};

export default AdminCreateEmployee;