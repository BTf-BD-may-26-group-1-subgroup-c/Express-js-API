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
  const id = req.params.id;
  let task = tasks.find(u => u.id === id);

  if(task){
    task = req.body;
    res.status(200).json(task)
    return; 
  }
  
  res.status(400).json({error: "Task doesn't exist"});
  return; 
}
//CREATE TASK  ROUTE
app.post('/tasks', createTask);

//UPDATE TASK ROUTE 
app.patch('tasks/:id', updateTask);


// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
