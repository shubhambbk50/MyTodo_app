import express from "express";
const router = express.Router();

//import controller
import { createTodo } from "../controllers/createTodo.js";
import { getTodo, getTodoById, getTodoByuserId } from "../controllers/getTodo.js";
import { updateTodo } from "../controllers/updateTodo.js";
import { deleteTodo } from "../controllers/deleteTodo.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


//define api routes
router.post(
  "/createTodo",
  verifyJWT,
  upload.array("attachment", 10),
  createTodo
);
router.get("/getTodos/all", verifyJWT, getTodo);
router.get("/getTodos/:id", verifyJWT, getTodoById);
router.get("/getTodos/byUserId/:id", verifyJWT, getTodoByuserId);
router.put("/updateTodo/:id", verifyJWT, updateTodo);
router.delete("/deleteTodo/:id", verifyJWT, deleteTodo);

export default router;
