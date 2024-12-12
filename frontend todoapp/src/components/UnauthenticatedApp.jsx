import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const UnauthenticatedApp = ({ authError }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h2>{authError || 'Please log in or sign up'}</h2>
      <button onClick={() => navigate('/login')}>Login</button> {/* Navigate to login */}
      <button onClick={() => navigate('/signup')}>Signup</button> {/* Navigate to signup */}
    </div>
  );
};

export default UnauthenticatedApp;
