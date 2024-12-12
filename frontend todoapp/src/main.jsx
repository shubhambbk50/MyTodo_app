import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App';
import './index.css'; // Global CSS

// Create the React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App within BrowserRouter for routing support
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
