const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Let's define the structure of tasks here. 
//Let's add an array of tasks



app.get('/', (req, res) => {
  res.json({ message: 'Express.js API is running', status: 'ok' });
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






app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
