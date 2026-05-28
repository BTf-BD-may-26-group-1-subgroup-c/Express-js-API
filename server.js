const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [];
let currentId = 0;

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

// ROUTE
app.post('/tasks', createTask);

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
