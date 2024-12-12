// components/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Clear the token from localStorage when the component mounts (logout)
    localStorage.removeItem('authToken');

    // Redirect to login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="logout">
      <p>You have been logged out. Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
