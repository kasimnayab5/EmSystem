import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './ViewEmployee.css';

const ViewEmployee = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(state?.employee || null);

  useEffect(() => {
    if (!employee) {
      const fetchEmployee = async () => {
        try {
          const response = await api.get(`/api/employees/${id}`);
          setEmployee(response.data);
        } catch (err) {
          console.error('Failed to fetch employee:', err);
          navigate('/admin/dashboard');
        }
      };
      fetchEmployee();
    }
  }, [id, employee, navigate]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-view">
      <h1>Employee Details</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      
      <div className="employee-info">
  <h2>{employee.fullName}</h2>
  <p data-label="Employee Code">{employee.employmentCode}</p>
  <p data-label="Company Email">{employee.companyEmail}</p>
  <p data-label="Mobile">{employee.mobile}</p>
  <p data-label="Reporting Manager">{employee.reportingManager}</p>
  <p data-label="Date of Joining">{employee.dateOfJoining}</p>
  <p data-label="Date of Birth">{employee.dateOfBirth}</p>
  <p data-label="Gender">{employee.gender}</p>
  <p data-label="Personal Email">{employee.personalMail}</p>
</div>
    </div>
  );
};

export default ViewEmployee;