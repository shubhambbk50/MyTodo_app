import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Public Routes
router.route('/signup').post(registerUser);  // Updated route to /signup for user registration
router.route('/login').post(loginUser);  // Handle login at /api/v1/users/login

// Secure Routes (JWT verification required)
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);

// CRUD Routes for users
router.route('/').get(verifyJWT, getAllUsers);
router.route('/:id')
  .get(verifyJWT, getUserById)
  .put(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

export default router;
