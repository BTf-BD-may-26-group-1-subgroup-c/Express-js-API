require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Let's define the structure of tasks here. 
//Let's add an array of tasks
let tasks = [
  {
    id: 1,
    title: "Set up project repository",
    description: "Create GitHub repo, add README, and invite team members.",
    status: "completed",
  },
  {
    id: 2,
    title: "Build Express server",
    description: "Initialise Express app, configure middleware, and set up routes.",
    status: "completed",
  },
  {
    id: 3,
    title: "Write Postman collection",
    description: "Document and test every endpoint in Postman, then export the collection.",
    status: "pending",
  },
  {
    id: 4,
    title: "Write Postman collection",
    description: "Document and test every endpoint in Postman, then export the collection.",
    status: "pending",
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task manager Express.js API by Group 1', status: 'ok' });
});

function getAllTasks(req, res){
  res.json({message: 'All tasks'})
}

function getTask(req, res) {
  res.json({message: 'Task'})
}

function createTask(req, res) {
  res.json({message: 'Task created'})
}

function updateTask(req, res) {
  res.json({message: 'Task updated '})
}

function deleteTask(req, res){
  res.json({message: 'Task deleted '})
}


app.get('/tasks', getAllTasks);

//let's call the above controller functions and attach them to the respective routes. 




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
