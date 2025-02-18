import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaUserCircle, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [profile, setProfile] = useState({
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
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Fetch employee profile
        const profileResponse = await api.get('/api/employee-profile');
        setProfile(profileResponse.data);

        // Fetch employee projects
        const projectsResponse = await api.get('/api/projects/my-projects');
        setProjects(projectsResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee data');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleDownloadPayslip = async () => {
    try {
      const response = await api.get(`/api/employees/${profile.employmentCode}/payslip`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payslip_${profile.employmentCode}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download payslip');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <FaUserCircle size={100} />
        <h1>Welcome, {profile.fullName}</h1>
      </div>

      {/* Employee Details Section with Toggle */}
      <div className="employee-details-section">
        <button
          onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}
          className="toggle-details-btn"
        >
          {showEmployeeDetails ? 'Hide Employee Details' : 'Show Employee Details'}
          {showEmployeeDetails ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {showEmployeeDetails && (
          <div className="employee-details-content">
            {/* Personal Details */}
            <div className="details-section">
              <h2>Personal Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{profile.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth:</span>
                  <span className="detail-value">{profile.dateOfBirth}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender:</span>
                  <span className="detail-value">{profile.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">PAN Card:</span>
                  <span className="detail-value">{profile.panCard}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Aadhar Card:</span>
                  <span className="detail-value">{profile.aadharCard}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current Address:</span>
                  <span className="detail-value">{profile.currentAddress}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Emergency Contact Name:</span>
                  <span className="detail-value">{profile.emergencyContactName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Emergency Contact Mobile:</span>
                  <span className="detail-value">{profile.emergencyContactMobile}</span>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="details-section">
              <h2>Professional Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Employment Code:</span>
                  <span className="detail-value">{profile.employmentCode}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Company Email:</span>
                  <span className="detail-value">{profile.companyEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Personal Email:</span>
                  <span className="detail-value">{profile.personalMail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mobile:</span>
                  <span className="detail-value">{profile.mobile}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Office Phone:</span>
                  <span className="detail-value">{profile.officePhone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reporting Manager:</span>
                  <span className="detail-value">{profile.reportingManager}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">HR Name:</span>
                  <span className="detail-value">{profile.hrName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Joining:</span>
                  <span className="detail-value">{profile.dateOfJoining}</span>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="details-section">
              <h2>Financial Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Bank Name:</span>
                  <span className="detail-value">{profile.bankName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">{profile.branch}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">IFSC Code:</span>
                  <span className="detail-value">{profile.ifscCode}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CTC Breakup:</span>
                  <span className="detail-value">₹{profile.ctcBreakup.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Navigation */}
      <div className="dashboard-navigation">
        <button
          onClick={() => setActiveSection('profile')}
          className={activeSection === 'profile' ? 'active' : ''}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveSection('projects')}
          className={activeSection === 'projects' ? 'active' : ''}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveSection('payroll')}
          className={activeSection === 'payroll' ? 'active' : ''}
        >
          Payroll
        </button>
      </div>

      {/* Active Section Content */}
      {activeSection === 'profile' && (
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Employment Code:</span>
              <span className="detail-value">{profile.employmentCode}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Company Email:</span>
              <span className="detail-value">{profile.companyEmail}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Personal Email:</span>
              <span className="detail-value">{profile.personalMail}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mobile:</span>
              <span className="detail-value">{profile.mobile}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{profile.dateOfBirth}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Joining:</span>
              <span className="detail-value">{profile.dateOfJoining}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Reporting Manager:</span>
              <span className="detail-value">{profile.reportingManager}</span>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'projects' && (
        <div className="projects-section">
          <h2>Current Projects</h2>
          {projects.length === 0 ? (
            <p>No active projects</p>
          ) : (
            <div className="projects-grid-container">
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.projectCode}</h3>
                  <p>Project Name: {project.projectName}</p>
                  <p>Client: {project.clientName}</p>
                  <p>Start Date: {project.startDate}</p>
                  <p>Ending Date: {project.endDate}</p>
                  <p>Status: {project.endDate ? 'Completed' : 'Active'}</p>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      )}

      {activeSection === 'payroll' && (
        <div className="payroll-section">
          <h2>Payroll Information</h2>
          <div className="payroll-details">
            <div className="detail-item">
              <span className="detail-label">CTC:</span>
              <span className="detail-value">₹{profile.ctcBreakup.toLocaleString()}</span>
            </div>
            <button onClick={handleDownloadPayslip}>
              <FaDownload /> Download Payslip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;