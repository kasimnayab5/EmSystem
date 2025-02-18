import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
      <h1 style={{ fontSize: '4rem', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;