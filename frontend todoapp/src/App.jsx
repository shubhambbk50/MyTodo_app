import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/TodoPage";
import Navbar from "./components/Navbar"; // Import Navbar
// import './App.css';

const App = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Handle logout functionality
  const handleLogout = () => {
    console.log("User logged out");

    // Clear user data (JWT token) from localStorage
    localStorage.removeItem('authToken'); // Remove token from localStorage

    // Redirect to the login page
    navigate("/login");
  };

  // Check if the user is authenticated by checking the presence of authToken in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  useEffect(() => {
    // If user is authenticated, redirect from /signup to /tasks
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]); // Run the effect when isAuthenticated or navigate changes

  return (
    <div>
      <Navbar onLogout={handleLogout} appTitle="My Todo App" /> {/* Navbar with title and logout */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        {isAuthenticated ? (
          <Route path="/tasks" element={<Todo />} />
        ) : (
          <Route path="/tasks" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
