import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook
import './Login.css'; // Import CSS for styling

const Login = () => {
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login method from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!companyEmail || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/login', {
        companyEmail,
        password
      });

      // Store user data in localStorage and context
      login({
        accessToken: response.data.accessToken,
        role: response.data.role,
        userId: response.data.userId,
        companyEmail: response.data.companyEmail
      });

      // Redirect based on role
      if (response.data.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Email:</label>
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;