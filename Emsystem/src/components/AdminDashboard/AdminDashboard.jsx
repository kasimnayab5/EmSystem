import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/employees');
      setEmployees(response.data || []);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      setError('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await api.delete(`/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      setError('Failed to delete employee');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
  
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      setError('Failed to delete project');
    }
  };
  

  const handleView = (employee) => {
    navigate(`/admin/employees/${employee.id}/view`, { state: { employee } });
  };

  const handleViewProject = (project) => {
    navigate(`/admin/projects/${project.id}/view`, { state: { project } });
  }

  const handleEditProject = (project) => {
    navigate(`/admin/projects/${project.id}/edit`, { state: { project } });
  }
  const handleEdit = (employee) => {
    navigate(`/admin/employees/${employee.id}/edit`, { state: { employee } });
  };

  if (loading) {
    return <div className="loading-container">Loading employees and projects...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      {/* Employee Section */}
      <section className="dashboard-section employee-section animated-entrance">
        <div className="section-header">
          <h2 className="section-title">Employee Directory</h2>
          {error && <p className="section-error">{error}</p>}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header">Code</th>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Manager</th>
                <th className="table-header">Project</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr 
                  key={employee.id} 
                  className="table-row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="table-data">{employee.employmentCode}</td>
                  <td className="table-data emphasize">{employee.fullName}</td>
                  <td className="table-data">{employee.companyEmail}</td>
                  <td className="table-data">{employee.reportingManager}</td>
                  <td className="table-data">{employee.projects?.[0]?.projectCode || 'N/A'}</td>
                  <td className="table-data actions-cell">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(employee)}
                    >
                      View
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && !loading && (
          <p className="no-employees">No employees found</p>
        )}
      </section>

      {/* Project Section */}
      <section className="dashboard-section project-section animated-entrance">
        <div className="section-header">
          <h2 className="section-title">Project Directory</h2>
          {error && <p className="section-error">{error}</p>}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header">Project Code</th>
                <th className="table-header">Project Name</th>
                <th className="table-header">Start Date</th>
                <th className="table-header">End Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr 
                  key={project.id} 
                  className="table-row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="table-data">{project.projectCode}</td>
                  <td className="table-data">{project.projectName}</td>
                  <td className="table-data">{project.startDate}</td>
                  <td className="table-data">{project.endDate}</td>
                  <td className="table-data actions-cell">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleViewProject(project)}
                    >
                      View
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && !loading && (
          <p className="no-projects">No projects found</p>
        )}
      </section>

      <button 
        className="add-project-btn glow-on-hover"
        onClick={() => navigate('/admin/projects/create')}
      >
        + New Project
      </button>
    </div>
  );
};

export default AdminDashboard;
