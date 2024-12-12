import cron from "node-cron";
import { sendEmail } from "./emailService.js"; // Email utility
import Twilio from "twilio";
import Todo from "../models/todo.js"; // Adjust path to your Todo model
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

// Twilio client setup
const twilioClient = Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send WhatsApp message
const sendWhatsAppMessage = async (to, message) => {
  try {
    if (!to.startsWith("whatsapp:")) {
      to = `whatsapp:+91${to}`; // Ensure the number starts with 'whatsapp:'
    }
    console.log(to);

    const response = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Make sure this is correctly set in the .env file
      to: to, // The 'to' number should include the 'whatsapp:' prefix
      body: message,
    });

    console.log("WhatsApp message sent: ", response.sid);
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message: ", error);
    throw error;
  }
};

// Schedule notifications
export const scheduleNotifications = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      console.log("Running notification check...");

      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

      const tasks = await Todo.find({
        schedule: { $gte: now, $lte: oneHourLater },
        notified: false,
      });

      for (const task of tasks) {
        const user = await User.findById({ _id: task.userId });
        console.log("user ,", user);
        const userEmail = user.email;
        const userPhone = user.phoneNumber;

        const subject = `Reminder: Upcoming Task "${task.title}"`;
        const text = `Your task "${task.title}" is scheduled for ${task.schedule}.`;
        const html = `
          <p>Reminder: Your task "<strong>${task.title}</strong>" is scheduled for:</p>
          <p><strong>${task.schedule}</strong></p>
        `;

        if (userEmail) {
          await sendEmail(userEmail, subject, text, html, task._id);
        }

        if (userPhone) {
          await sendWhatsAppMessage(userPhone, text);
        }
      }
    } catch (error) {
      console.error("Error in notification scheduler: ", error);
    }
  });
};
