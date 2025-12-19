import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../UI/ThemeToggle';
import { Brain, Menu, X, LogOut, Package, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
      setShowDropdown(false);
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <Brain className="logo-icon" />
            <span className="logo-text">AI Model Inventory</span>
          </Link>

          {/* Desktop Menu */}
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/models" className="nav-item">All Models</Link>
            {user && <Link to="/add-model" className="nav-item">Add Model</Link>}
          </div>

          {/* Right Section */}
          <div className="nav-actions">
            <ThemeToggle />

            {user ? (
              <div className="user-menu">
                <button
                  className="profile-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName || 'User'}
                    className="profile-img"
                  />
                </button>

                {showDropdown && (
                  <div className="dropdown">
                    <div className="dropdown-header">
                      <p className="user-name">{user.displayName || 'User'}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <Link
                      to="/my-purchases"
                      onClick={() => setShowDropdown(false)}
                      className="dropdown-item"
                    >
                      <ShoppingCart size={16} /> My Purchases
                    </Link>
                    <Link
                      to="/my-models"
                      onClick={() => setShowDropdown(false)}
                      className="dropdown-item"
                    >
                      <Package size={16} /> My Models
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
            <Link to="/models" onClick={() => setShowMobileMenu(false)}>All Models</Link>
            {user && (
              <>
                <Link to="/add-model" onClick={() => setShowMobileMenu(false)}>Add Model</Link>
                <Link to="/my-purchases" onClick={() => setShowMobileMenu(false)}>My Purchases</Link>
                <Link to="/my-models" onClick={() => setShowMobileMenu(false)}>My Models</Link>
                <button onClick={handleLogout} className="logout-mobile">Logout</button>
              </>
            )}
            {!user && <Link to="/login" onClick={() => setShowMobileMenu(false)}>Login</Link>}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
