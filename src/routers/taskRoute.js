const { getTask, addTask, updateTask, deletetask } = require("../controller/taskController");

const route = require("express").Router();

// get task
route.get("/tasks", getTask);

// add task || Post task
route.post("/task", addTask);

// Update the task
route.put("/task/:id", updateTask);

// Delete the task
route.delete("/task/:id", deletetask);

module.exports = route;
