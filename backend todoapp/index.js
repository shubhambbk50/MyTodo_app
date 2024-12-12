import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/database.js';
import userRouter from './routes/user.routes.js';  // Correct path to your user routes
import todoRouter from "./routes/todos.js"
import cors from 'cors';
import { scheduleNotifications } from "./utils/notificationService.js"; // Import notification service

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS middleware configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins, but with credentials enabled
    callback(null, true);  // Accept all origins
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};


app.use(cors(corsOptions));  // Apply CORS middleware

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the user API routes under /api/v1/users
app.use('/api/v1/users', userRouter);  // Now routes are accessible like /api/v1/users/register
app.use('/api/v1/', todoRouter);  // Now routes are accessible like /api/v1/users/register

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo App!');
});

// Connect to the database and start the server
dbConnect();

// Start the notification scheduler
scheduleNotifications();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
