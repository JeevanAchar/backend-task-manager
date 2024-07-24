const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        default: "todo"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Task = new mongoose.model("Task", taskModel);

module.exports = Task;
