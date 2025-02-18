import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="main-navbar">
    <h1 className="navbar-logo">Employee Management System</h1>
    
    <div className="navbar-controls">  
      <div className="navbar-profile-section">
        {(location.pathname.startsWith('/admin') || location.pathname.startsWith('/employee')) && (
          <>
            {role === 'ADMIN' && (
              <button 
                className="navbar-button navbar-button--add"
                onClick={() => navigate('/admin/employees/create')}
              >
                Add Employee
              </button>
            )}
            <button 
              className="navbar-button navbar-button--logout" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;