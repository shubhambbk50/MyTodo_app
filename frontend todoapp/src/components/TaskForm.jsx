import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import { isLoggedIn } from '../services/authService'; // Function to check login status
import './TaskForm.css';
import { useEffect } from 'react';

const TaskForm = ({refreshTasks}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');  // For displaying error messages

  const setDefaultTime = () => {
    const today = new Date();
    // Set to tomorrow at 9:00 AM
    today.setDate(today.getDate() + 1);
    today.setHours(14, 30, 0, 0); // Set the time to 9:00 AM

    // Format date to 'YYYY-MM-DDTHH:MM' format for datetime-local
    const formattedDate = today.toISOString().slice(0, 16);
    setSchedule(formattedDate);
  };

  useEffect(()=>{
    // setDefaultTime();
    refreshTasks();
  },[])

  // Handle file change for attachments
  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!isLoggedIn()) {
      setErrorMessage('You are not logged in. Please log in to add tasks.');
      return;
    }

    console.log("attachments -> ",attachments);
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('schedule', schedule);
    formData.append('userId',userId);
    attachments.forEach((file) => formData.append('attachment', file)); // Using 'attachment' to match backend

    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('You are not logged in. Please log in to add tasks.');
        return;
      }

      console.log("formData ,",formData)

      // Send the task data to the backend
      const response = await axios.post('http://localhost:3000/api/v1/createTodo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      if (response.data.success) {
        // alert('Task added successfully!');
        setDefaultTime();
        refreshTasks();
        setTitle('');
        setDescription('');
        setSchedule('');
        setAttachments([]);
        setErrorMessage('');  // Clear error message on successful submission
      } else {
        setErrorMessage(response.data.message || 'Failed to add task.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to add task.');
    }
  };

  return (
    <div className="task-form">
      <h2>Add a New Task</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Display error message */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Schedule:
          <input
            type="datetime-local"
            value={schedule || setDefaultTime()}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </label>
        <label>
          Attachments:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
