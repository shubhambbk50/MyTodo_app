import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connection established successfully");
        })
        .catch((error) => {
            console.log("Error connecting to the database");
            console.error(error.message);
            process.exit(1); // Exits the process if connection fails
        });
};



export default dbConnect;
