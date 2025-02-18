import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './ProjectForm.css'

const ProjectForm = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        projectCode: '',
        projectName: '',
        clientName: '',
        startDate: '',
        endDate: '',
        reportingManager: '',
        employee: { id: '' }  // ✅ Corrected: Employee object with id
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch employees list when component mounts
    useEffect(() => {
      const fetchEmployees = async () => {
          try {
              const response = await api.get('/api/employees');
              console.log("Employees API Response:", response.data);  // ✅ Log response
              setEmployees(Array.isArray(response.data) ? response.data : []); // ✅ Ensure it's an array
          } catch (err) {
              console.error("Error fetching employees:", err);
              setEmployees([]); // ✅ Avoid undefined state
          }
      };
      fetchEmployees();
  }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "employeeId") {
            setFormData(prevData => ({
                ...prevData,
                employee: { id: value }  // ✅ Ensure employee ID is set correctly
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    {Array.isArray(employees) && employees.length > 0 ? (
      employees.map(emp => (
          <option key={emp.id} value={emp.id}>
              {emp.fullName} ({emp.companyEmail})
          </option>
      ))
  ) : (
      <option disabled>Loading employees...</option>
  )}

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
    
      // Validate required fields
      if (!formData.projectCode || !formData.projectName || !formData.clientName || 
          !formData.startDate || !formData.endDate || !formData.reportingManager || 
          !formData.employee.id) {
        setError("All fields are required");
        setIsSubmitting(false);
        return;
      }
    
      // Prepare the request payload
      const payload = {
        projectCode: formData.projectCode,
        projectName: formData.projectName,
        clientName: formData.clientName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reportingManager: formData.reportingManager,
        employee: { id: formData.employee.id } // Ensure employee ID is properly mapped
      };
    
      console.log("Submitting Data:", payload); // Debugging log
    
      try {
        const response = await api.post('/api/projects', payload);
        console.log("Response:", response.data); // Debugging log
        navigate('/admin/dashboard');
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || 'Project creation failed');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
        <div className="project-form-container">
            <h2>Create Project</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Code:</label>
                    <input
                        type="number"
                        name="projectCode"
                        value={formData.projectCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Project Name:</label>
                    <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Client Name:</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <div className="form-group">
                    <label>Assign Employee:</label>
                    <select name="employeeId" value={formData.employee.id} onChange={handleChange} required>
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.companyEmail})</option>
                        ))}
                    </select>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
