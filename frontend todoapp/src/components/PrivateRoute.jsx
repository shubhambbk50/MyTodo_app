// components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('authToken'); // Check if there's a token

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" replace />} // Redirect to login if no token
    />
  );
};

export default PrivateRoute;
