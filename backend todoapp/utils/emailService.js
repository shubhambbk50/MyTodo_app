import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Todo from "../models/todo.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text, html,taskId) => {
  try {
    console.log("to ,",to);
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    await Todo.findOneAndUpdate(
      { _id: taskId },  // Find the task by its ID
      { notified: true }, // Update the 'notified' field to true
      { new: true }  // Return the updated document
    );
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
