import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f2f5'
    }}>
      <h1 style={{ fontSize: '4rem', color: '#333' }}>403</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Unauthorized Access</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        You do not have permission to access this page.
      </p>
      <Link 
        to="/login" 
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Return to Login
      </Link>
    </div>
  );
};

export default Unauthorized;