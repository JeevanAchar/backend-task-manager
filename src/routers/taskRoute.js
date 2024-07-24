const { getTask, addTask, updateTask, deletetask } = require("../controller/taskController");

const route = require("express").Router();

// get tasks
route.get("/tasks/:id", getTask);

// add task || Post task
route.post("/task/:id", addTask);

// Update the task
route.put("/task/:id", updateTask);

// Delete the task
route.delete("/task/:id", deletetask);

module.exports = route;
