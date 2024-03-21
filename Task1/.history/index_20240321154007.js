const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];

// GET /tasks: returns a list of all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks: creates a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  const id = tasks.length + 1;
  const newTask = { id, title, description, status };
  tasks.push(newTask);
  res.status(201).json({ message: 'Task created successfully', task: newTask });
});

// GET /tasks/:id: returns a single task with the given ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// PUT /tasks/:id: updates a task with the given ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks[index] = { ...tasks[index], title, description, status };
    res.json({ message: 'Task updated successfully', task: tasks[index] });

  }
});

// DELETE /tasks/:id: deletes a task with the given ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
