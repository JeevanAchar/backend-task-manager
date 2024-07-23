const Task = require("../models/taskModel.js");

const getTask = async (req, res, next) => {
    try {
        const task = await Task.find();
        if (task.length) {
            return res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: {
                    task
                }
            })
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "No data found",
                data: {}
            });
        }
    } catch (err) {
        next(err);
    }
}

const addTask = async (req, res, next) => {
    const { title, description, status } = req.body;
    try {
        const task = Task.create({
            title,
            description,
            status
        });

        return res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: {
                task
            }
        });
    } catch (err) {
        next(err);
    }
}

const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, data, { new: true });
        if (task) {
            return res.status(201).json({
                statusCode: 201,
                message: "Success",
                data: {
                    task
                }
            })
        } else {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (err) {
        next(err);
    }
}

const deletetask = async (req, res, next) => {
    const id = req.params.id;
    try {
        const taskDeleted = await Task.findByIdAndDelete(id);
        if (taskDeleted) {
            return res.status(200).json({
                statusCode: 200,
                message: "task deleted"
            });
        } else {
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getTask,
    addTask,
    updateTask,
    deletetask
}
