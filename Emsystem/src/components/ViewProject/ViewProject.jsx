import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './ViewProject.css';

const ViewProject = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(state?.project || null);

  useEffect(() => {
    if (!project) {
      const fetchProject = async () => {
        try {
          const response = await api.get(`/api/projects/${id}`);
          setProject(response.data);
        } catch (err) {
          console.error('Failed to fetch project:', err);
          navigate('/admin/dashboard');
        }
      };
      fetchProject();
    }
  }, [id, project, navigate]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-info">
  <h1 className="project-title">Project Information</h1>
  <h2 className="project-name">{project.projectName}</h2>
  
  <div className="project-details">
    <p className="detail-item" data-label="Project Code:">
      {project.projectCode}
    </p>
    <p className="detail-item" data-label="Client:">
      {project.clientName}
    </p>
    <p className="detail-item" data-label="Start Date:">
      {project.startDate}
    </p>
    <p className="detail-item" data-label="End Date:">
      {project.endDate || 'Ongoing'}
    </p>
    <p className="detail-item" data-label="Reporting Manager:">
      {project.reportingManager}
    </p>
    <p className="detail-item" data-label="Assigned Employee:">
      {project.employee?.fullName} ({project.employee?.companyEmail})
    </p>
  </div>

  <button className="back-button" onClick={() => navigate(-1)}>
    Back to Projects
  </button>
</div>
  );
};

export default ViewProject;