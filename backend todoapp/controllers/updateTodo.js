import Todo from "../models/todo.js";

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, schedule, attachments } = req.body;

    // Check if the todo item exists
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo item not found",
      });
    }

    // Update the todo with the new values
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.schedule = schedule || todo.schedule;
    todo.attachments = attachments || todo.attachments;
    todo.updatedAt = Date.now();

    // Save the updated todo
    await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo updated successfully",
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
