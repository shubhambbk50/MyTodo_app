import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';  // assuming this function exists for fetching tasks
import { isLoggedIn } from '../services/authService'; // Function to check login status
import { format, parseISO } from 'date-fns'; // Import the format function from date-fns
import './TaskList.css';

const TaskList = ({tasks}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // First, compare the dates
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  
  // Compare dates first
  const dateComparison = dateB - dateA;
  
  // If dates are the same, then compare times
  if (dateComparison === 0) {
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    return timeA - timeB;
  }
  
  return dateComparison;
  });

  if (sortedTasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {sortedTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {sortedTasks.map((task) => {
            let formattedSchedule = "Invalid date"; // Default value in case of error
            const createdAt = format(parseISO(task.createdAt), 'yyyy-MM-dd HH:mm')
            // Check if task.schedule is valid and parse it
            try {
              if (task.schedule) {
                const parsedDate = parseISO(task.schedule);
                formattedSchedule = format(parsedDate, 'yyyy-MM-dd HH:mm');
              }
            } catch (error) {
              console.error("Error parsing date:", error);
            }

            return (
              <li key={task._id}>
                <h3>{task.title}</h3>
                <p className='bg-red-100'>{task.description || 'No description'}</p>
                <p>Schedule: {formattedSchedule}</p>
                <p>createdAt: {createdAt}</p>
                {task.attachments && task.attachments.length > 0 && (
                  <div>
                    <h4>Attachments:</h4>
                    <ul>
                      {task.attachments.map((attachment, index) => (
                        <li key={index}>
                          <a
                            href={`${attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Attachment {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
