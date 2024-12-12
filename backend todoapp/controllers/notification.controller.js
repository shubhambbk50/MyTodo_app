import nodemailer from 'nodemailer';
import Todo from '../models/todo.js';
import { ApiError } from '../utils/ApiError.js';

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or an app-specific password
  },
});

// Send Email function
const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Controller for sending todo reminder notifications
export const sendTodoReminder = async (req, res) => {
  try {
    const { todoId } = req.params;

    // Fetch the Todo item by ID
    const todo = await Todo.findById(todoId);

    // Check if Todo exists
    if (!todo) {
      throw new ApiError(404, 'Todo not found');
    }

    // Send reminder email (assuming a user is associated with the Todo)
    const email = req.user.email; // Assume user is logged in and email is in req.user

    // Set the email subject and message
    const subject = `Reminder: ${todo.title}`;
    const text = `This is a reminder for your todo: "${todo.title}". It is scheduled for ${todo.schedule}.`;

    // Send the email
    await sendEmail(email, subject, text);

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: 'Reminder notification sent successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: 'Server Error',
    });
  }
};
