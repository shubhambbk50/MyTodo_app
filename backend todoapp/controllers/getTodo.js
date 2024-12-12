import Todo from "../models/todo.js";
import { ApiError } from "../utils/ApiError.js"; // Optional if you use a custom error handler

export const getTodo = async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.find({});

    // Response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo Data is fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params; // Use destructuring to extract `id`

    // Fetch todo by ID
    const todo = await Todo.findById(id);

    // If todo not found
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No Data Found with Given ID",
      });
    }

    // If todo is found
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo with ID ${id} successfully fetched`, // Corrected string interpolation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};

export const getTodoByuserId = async (req, res) => {
  try {
    const { id } = req.params; // Use destructuring to extract `id`

    // Fetch todo by ID
    const todo = await Todo.find({ userId: id });

    console.log("todo -> ,",todo)

    // If todo not found
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No Data Found with Given ID",
      });
    }

    // If todo is found
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo with ID ${id} successfully fetched`, // Corrected string interpolation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
