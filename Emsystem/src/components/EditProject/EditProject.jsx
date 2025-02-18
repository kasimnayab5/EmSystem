import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './EditProject.css';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectCode: '',
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    reportingManager: '',
    employeeId:'' 
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const projectResponse = await api.get(`/api/projects/${id}`);
            const projectData = projectResponse.data;
            
            const employeesResponse = await api.get('/api/employees');
            setEmployees(employeesResponse.data);

            setFormData({
                projectCode: projectData.projectCode,
                projectName: projectData.projectName,
                clientName: projectData.clientName,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
                reportingManager: projectData.reportingManager,
                employeeId: projectData.employee?.id || '' // Set single employee ID
            });
        } catch (err) {
            setError('Failed to load project data');
        }
    };
    fetchData();
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "employees") {
      setFormData(prev => ({
        ...prev,
        employees: Array.from(e.target.selectedOptions, option => option.value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
        const payload = {
            ...formData,
            employee: { id: formData.employeeId } // Correct payload structure
        };
        await api.put(`/api/projects/${id}`, payload);
        window.alert('Changes saved successfully!'); 
        navigate('/admin/dashboard');
    } catch (err) {
        setError(err.response?.data?.error || 'Update failed');
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="edit-project-container">
      <h2>Edit Project</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Code:</label>
          <input type="number" name="projectCode" value={formData.projectCode} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Project Name:</label>
          <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Client Name:</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Reporting Manager:</label>
          <input type="text" name="reportingManager" value={formData.reportingManager} onChange={handleChange} required />
        </div>

        <div className="form-group">
    <label>Assigned Employee:</label>
    <select 
        name="employeeId" 
        value={formData.employeeId} 
        onChange={handleChange} 
        required
    >
        <option value="">Select Employee</option>
        {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
                {emp.fullName} ({emp.companyEmail})
            </option>
        ))}
    </select>
</div>

        <div className="button-group">
          <button type="submit" disabled={isSubmitting} className="save-button">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
