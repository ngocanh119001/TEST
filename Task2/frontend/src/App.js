import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = 'http://localhost:5000'; // Địa chỉ của backend

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editMode && editId) {
        await axios.put(`${backendUrl}/api/notes/${editId}`, { title, body });
        toast.success('Note edited successfully!');
      } else {
        await axios.post(`${backendUrl}/api/notes`, { title, body });
        toast.success('Note added successfully!');
      }
      fetchNotes();
      setTitle('');
      setBody('');
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/notes/${id}`);
      toast.success('Note deleted successfully!');
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = async (id, existingTitle, existingBody) => {
    setTitle(existingTitle);
    setBody(existingBody);
    setEditMode(true);
    setEditId(id);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Notes App</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '10px' }}
        ></textarea>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {editMode && (
            <button onClick={handleCancelEdit} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
          )}
          <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{editMode ? 'Save Edit' : 'Save'}</button>
        </div>
      </div>
      <div>
        <h2 style={{ marginBottom: '10px' }}>Notes</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '5px' }}>{note.title}</strong>
                <p style={{ marginBottom: '0' }}>{note.body}</p>
              </div>
              <button onClick={() => handleDelete(note.id)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              <button onClick={() => handleEdit(note.id, note.title, note.body)} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;





