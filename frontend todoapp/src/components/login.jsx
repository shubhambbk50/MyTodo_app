import React, { useState } from 'react';
import { login } from '../services/authService'; // Import login service
import { useNavigate } from 'react-router-dom'; // Use navigate instead of useHistory
import { Link } from 'react-router-dom'; // Import Link for sign-up navigation
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error handling
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true during API call

    try {
      const data = await login(username, password);

      console.log('Data from the login:', data);

      if (data.success) {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        localStorage.setItem('userId', data.userId);
        navigate('/tasks'); // Redirect to tasks page using navigate
      } else {
        setError(data.message || 'Login failed'); // Set error message
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('An error occurred. Please try again.'); // Handle errors
    } finally {
      setIsLoading(false); // Reset loading state after API call
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <label>
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading || !username || !password}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/signup" style={styles.signupLink}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};

const styles = {
  signupLink: {
    color: '#1E90FF', // Blue color for the link
    textDecoration: 'none', // Remove underline
  },
};

export default Login;
