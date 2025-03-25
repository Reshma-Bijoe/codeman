
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    
    if (loggedInUser) {
      // If logged in, go to home
      navigate('/home');
    } else {
      // If not logged in, go to welcome page
      navigate('/welcome');
    }
  }, [navigate]);
  
  return null; // This component will only redirect, so no UI needed
};

export default Index;
