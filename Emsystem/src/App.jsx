import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import EditEmployee from './components/EditEmployee/EditEmployee';
import EditProject from './components/EditProject/EditProject';
import ViewEmployee from './components/ViewEmployee/ViewEmployee';
import ProjectForm from './components/ProjectForm/ProjectForm';
import AdminCreateEmployee from './components/AdminCreateEmployee/AdminCreateEmployee';
import ViewProject from './components/ViewProject/ViewProject';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* Redirect root path to /login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route element={<PrivateRoute roles={['ADMIN']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/employees/create" element={<AdminCreateEmployee />} />
                <Route path="/admin/employees/:id/view" element={<ViewEmployee />} />
                <Route path="/admin/employees/:id/edit" element={<EditEmployee />} />
                <Route path="/admin/projects/:id/view" element={<ViewProject/>} />
                <Route path="/admin/projects/:id/edit" element={<EditProject />} />
                <Route path="/admin/projects/create" element={<ProjectForm />} />
              </Route>

              {/* Employee Route */}
              <Route element={<PrivateRoute roles={['EMPLOYEE']} />}>
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              </Route>

              {/* Common Private Route */}
              <Route element={<PrivateRoute />}>
                <Route path="/view-employee" element={<ViewEmployee />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;