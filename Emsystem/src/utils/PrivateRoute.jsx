import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check user role
  if (roles.length > 0) {
    const normalizedUserRole = user?.role?.toUpperCase();
    const normalizedAllowedRoles = roles.map(role => role.toUpperCase());

    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Allow access
  return <Outlet />;
};

export default PrivateRoute;