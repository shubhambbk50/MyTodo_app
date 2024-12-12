import Todo from "../models/todo.js";
import { ApiError } from "../utils/ApiError.js"; // If you have a custom error handler

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the Todo exists before attempting to delete
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new ApiError(404, 'Todo not found');
    }

    await Todo.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Todo DELETED',
    });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  }
};
