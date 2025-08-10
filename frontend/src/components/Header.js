import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../App';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Home size={24} />
            <span>HouseRent</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/properties" onClick={() => setIsMenuOpen(false)}>Properties</Link>
            
            {user?.isAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            )}
          </nav>

          <div className="auth-buttons">
            {user ? (
              <div className="user-menu">
                <span className="user-email">
                  <User size={16} />
                  {user.email}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 