
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to CodeMaster</h1>
        <p className="welcome-description">
          Master your Python coding skills with our collection of coding challenges.
          Solve problems, test your solutions, and climb the leaderboard.
        </p>
        
        <div className="welcome-buttons">
          <Link to="/login" className="welcome-button login-button">
            Login
          </Link>
          <Link to="/signup" className="welcome-button signup-button">
            Create Account
          </Link>
        </div>
        
        <div className="welcome-footer">
          <p>Already have an account? <Link to="/login" className="welcome-link">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
