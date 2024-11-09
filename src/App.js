import React, { useState, useEffect } from 'react';
import api from './api';
import { Button, TextField, List, ListItem, ListItemText, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    api.get('/').then((response) => setTodos(response.data));
  }, []);

  const addTodo = () => {
    api.post('/', { title, description: '', completed: false }).then((response) => {
      setTodos([...todos, response.data]);
      setTitle('');
    });
  };

  const toggleComplete = (todo) => {
    api.put(`/${todo.id}`, { ...todo, completed: !todo.completed }).then(() => {
      setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
    });
  };

  const deleteTodo = (id) => {
    api.delete(`/${id}`).then(() => {
      setTodos(todos.filter((t) => t.id !== id));
    });
  };

  const openEditDialog = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
  };

  const closeEditDialog = () => {
    setEditTodo(null);
    setEditTitle('');
  };

  const saveEdit = () => {
    api.put(`/${editTodo.id}`, { ...editTodo, title: editTitle }).then(() => {
      setTodos(todos.map((t) => (t.id === editTodo.id ? { ...t, title: editTitle } : t)));
      closeEditDialog();
    });
  };

  return (
    <div>
      <TextField
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={addTodo} variant="contained" color="primary">
        Add
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>

      {/* 编辑对话框 */}
      <Dialog open={Boolean(editTodo)} onClose={closeEditDialog}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
