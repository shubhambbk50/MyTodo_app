    // models/todo.js
    import mongoose from 'mongoose';

    const todoSchema = new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                maxLength: 50,
            },
            description: {
                type: String,
                maxLength: 50,
            },
            schedule: {
                type: Date,
                required: true,
            },
            attachments: {
                type: [String], // Array of attachment URLs
            },
            notified: {
                type: Boolean,
                default: false, // Set to false initially, will be set to true after notification is sent
            },
            userId : {
                type: String,
                require: true,
            },
        },
        { timestamps: true } 
    );

    const Todo = mongoose.model('Todo', todoSchema);
    export default Todo;
