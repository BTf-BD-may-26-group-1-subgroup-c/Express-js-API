const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
  { id: 1,
    name: "Create Github repository. ",
    completed: true }
];
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


//Controller for update a task 
function updateTask(req, res) {
  const id = parseInt(req.params.id);
  let task = tasks.find(u => u.id === id);

  if(!task){
    
    res.status(404).json({error : "Task not found"})
    return; 
  }
  Object.assign(task, req.body); 
  return res.status(200).json(task);
  
}
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
// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app
