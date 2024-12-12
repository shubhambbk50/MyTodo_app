import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import './TodoPage.css';
import { getTasks } from "../services/taskService";
import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const response = await getTasks();  // Call your API to get tasks
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    }
  };

  return (
    <div className="todo-container">
      <div className="task-form">
        <TaskForm refreshTasks={refreshTasks}/>
      </div>
      <div className="task-list">
        <TaskList tasks={tasks}/>
      </div>
    </div>
  );
}

export default Todo;
