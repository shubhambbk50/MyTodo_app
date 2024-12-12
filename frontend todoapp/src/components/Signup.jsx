import React, { useState } from 'react';
import { signup } from '../services/authService'; // Import the signup service
import { useNavigate } from 'react-router-dom'; // For navigation

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [error, setError] = useState(null); // For error handling
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Basic client-side validation
  const isFormValid = 
    formData.username && 
    formData.email && 
    formData.password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the data, only include phoneNumber if it's not empty
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ...(formData.phoneNumber && { phoneNumber: formData.phoneNumber })
      };

      const response = await signup(signupData);

      if (response.success) {
        // Assuming the API returns user data on successful signup
        // alert('Signup successful!');
        navigate('/login'); // Navigate to todo page
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      setError(error.response?.data?.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mb-4">
          <label className="block mb-2">
            Username:
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </label>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">
            Phone Number (Optional):
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading || !isFormValid}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-500">Login here</a>
      </p>
    </div>
  );
};

export default Signup;