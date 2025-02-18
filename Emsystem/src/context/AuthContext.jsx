import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const companyEmail = localStorage.getItem('companyEmail');

    if (token && role && userId && companyEmail) {
      setIsAuthenticated(true);
      setUser({ 
        token, 
        role,
        userId,
        companyEmail
      });
    }
  }, []);

  // Login method
  const login = (userData) => {
    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('companyEmail', userData.companyEmail);
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyEmail');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};