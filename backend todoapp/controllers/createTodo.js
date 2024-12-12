import cloudinary from "cloudinary";
import multer from "multer";
import Todo from "../models/todo.js";
import fs from 'fs';
import streamifier from "streamifier"; // Add this import

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("attachment");

// Configure Cloudinary (ensure your credentials are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file buffer to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file uploaded successfully
    console.log("file uploaded successfully on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the local file if opr failed
    return null;
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description, schedule,userId } = req.body;
    let attachmentUrls = [];

    // Multiple files handling
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        console.log("cloudinaryResponse -> ",cloudinaryResponse)
        if (cloudinaryResponse) {
          console.log("cloudinaryResponse -> ",cloudinaryResponse.url)
          attachmentUrls.push(cloudinaryResponse.url);
        }
      }
    }

    console.log("attachmentUrls -> ",attachmentUrls)


    const newTodo = await Todo.create({
      title,
      description,
      schedule,
      userId,
      attachments: attachmentUrls,
    });

    // await newTodo.save();

    res.status(200).json({ success: true, data: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
