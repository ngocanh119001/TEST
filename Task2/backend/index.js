const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

let notes = [];

// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, body } = req.body;
  const id = notes.length + 1;
  const newNote = { id, title, body };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Note not found' });
  } else {
    notes[index] = { ...notes[index], title, body };
    res.json(notes[index]);
  }
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Note not found' });
  } else {
    const deletedNote = notes.splice(index, 1);
    res.json(deletedNote[0]);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
