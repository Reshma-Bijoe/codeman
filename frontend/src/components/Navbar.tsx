
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'navbar-link active' : 'navbar-link';
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/welcome');
  };
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          CodeMaster
        </Link>
        <div className="navbar-menu">
          <Link to="/home" className={isActive('/home')}>
            Home
          </Link>
          <Link to="/challenges" className={isActive('/challenges')}>
            Challenges
          </Link>
          <Link to="/leaderboard" className={isActive('/leaderboard')}>
            Leaderboard
          </Link>
          
          {user && (
            <div className="profile-dropdown">
              <button className="profile-button" onClick={toggleProfileMenu}>
                <div className="profile-avatar">
                  <img src={user.avatar} alt={user.username} />
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <span>{user.username}</span>
                  </div>
                  <Link to="/profile" className="profile-menu-item">
                    My Profile
                  </Link>
                  <Link to="/my-submissions" className="profile-menu-item">
                    My Submissions
                  </Link>
                  <button className="profile-menu-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
