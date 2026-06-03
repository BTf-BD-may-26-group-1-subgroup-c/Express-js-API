require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// In-memory data store for tasks
const tasks = [
  { id: 1,
    name: "Create Github repository. ",
    completed: true },
  { id: 2,
    name: "Set up Express.js server. ",
    completed: true }, 
  { id: 3,
    name: "Implement CRUD operations. ",
    completed: false }   
];
let currentId = 3; // To keep track of the last assigned ID

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task manager Express.js API by Group 1",
    status: "ok",
  });
});

// CONTROLLER for creating a task
function createTask(req, res) {
  const { name } = req.body;

  currentId++;

  const task = {
    id: currentId,
    name: name,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
}


// Controller for updating a task 
function updateTask(req, res) {
  const id = parseInt(req.params.id);
  let task = tasks.find(u => u.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Protect the ID by destructuring it out of req.body, 
  // or explicitly preventing it from being overwritten.
  const { id: _, ...updateData } = req.body; 
  Object.assign(task, updateData); 
  return res.status(200).json(task);
};

//Controller for get a task by id
function getTaskById(req, res) {
  const id = parseInt(req.params.id);
  const task = tasks.find(u => u.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
}

//get all tasks controller
function getTasks(req, res) {
  res.status(200).json(tasks);
}

//controller for delete a task
function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((u) => u.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
}

//CREATE TASK  ROUTE
app.post("/tasks", createTask);

//UPDATE TASK ROUTE
app.patch("/tasks/:id", updateTask);

//DELETE TASK ROUTE
app.delete("/tasks/:id", deleteTask);

//GET ALL TASKS ROUTE
app.get("/tasks", getTasks);

//GET TASK BY ID ROUTE
app.get("/tasks/:id", getTaskById);

// SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app
