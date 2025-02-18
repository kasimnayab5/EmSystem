import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './EditEmployee.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditEmployee = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(state?.employee || {});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!state?.employee) {
      // If no state, fetch from API
      const employeeId = window.location.pathname.split('/').pop();
      api.get(`/api/employees/${employeeId}`)
        .then(res => setFormData(res.data))
        .catch(err => setError('Failed to load employee'));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/employees/${formData.id}`, formData);
      window.alert('Changes saved successfully!'); 
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="employee-edit">
      <h1>Edit Employee</h1>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <fieldset>
        <legend>Personal Information</legend>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Personal Email:
          <input
            type="email"
            name="personalMail"
            value={formData.personalMail || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mobile:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile || ''}
            onChange={handleChange}
            required
          />
        </label>

       
        <label>
          Date of Birth:
          <input type="date" 
          name="dateOfBirth" 
          value={formData.dateOfBirth} 
          onChange={handleChange} 
          required />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Current Address:
          <input
            type="text"
            name="currentAddress"
            value={formData.currentAddress || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Emergency Contact Name:
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Emergency Contact Mobile:
          <input
            type="tel"
            name="emergencyContactMobile"
            value={formData.emergencyContactMobile || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Aadhar Card:
          <input
            type="text"
            name="aadharCard"
            value={formData.aadharCard || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          PAN Card:
          <input
            type="text"
            name="panCard"
            value={formData.panCard || ''}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>

      {/* Professional Details */}
      <fieldset>
        <legend>Professional Details</legend>
        <label>
          Employment Code:
          <input
            type="number"
            name="employmentCode"
            value={formData.employmentCode || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            name="companyEmail"
            value={formData.companyEmail || ''}
            onChange={handleChange}
            disabled // Often email shouldn't be editable
          />
        </label>

        <label>
          Reporting Manager:
          <input
            type="text"
            name="reportingManager"
            value={formData.reportingManager || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Office Phone:
          <input
            type="tel"
            name="officePhone"
            value={formData.officePhone || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          HR Name:
          <input
            type="text"
            name="hrName"
            value={formData.hrName || ''}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining || ''}
            onChange={handleChange}
            required
          />
        </div>

      </fieldset>

      {/* Finance Details */}
      <fieldset>
        <legend>Finance Details</legend>
        <label>
          Bank Name:
          <input
            type="text"
            name="bankName"
            value={formData.bankName || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          IFSC Code:
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          CTC Breakup:
          <input
            type="number"
            name="ctcBreakup"
            value={formData.ctcBreakup || ''}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
          
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </form>
    </div>
  );
};

export default EditEmployee;