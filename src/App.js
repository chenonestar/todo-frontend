import React, { useState, useEffect } from 'react';
import api from './api';
import { Button, TextField, List, ListItem, ListItemText, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, ButtonGroup, Snackbar, MenuItem, Typography, Box, Container, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('中');
  const [dueDate, setDueDate] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('中');
  const [editDueDate, setEditDueDate] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // SnackBar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Delete confirmation dialog state
  const [deleteTodoId, setDeleteTodoId] = useState(null);

  useEffect(() => {
    api.get('/').then((response) => setTodos(response.data));
  }, []);

  const addTodo = () => {
    const formattedDueDate = dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : null;

    api.post('/', { title, description, priority, dueDate: formattedDueDate, completed: false })
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
        setPriority('中');
        setDueDate(null);
        showSnackbar('待办事项添加成功', 'success');
      })
      .catch(() => {
        showSnackbar('添加待办事项失败', 'error');
      });
  };

  const toggleComplete = (todo) => {
    api.put(`/${todo.id}`, { ...todo, completed: !todo.completed })
      .then(() => {
        setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
        showSnackbar('待办事项更新成功', 'success');
      })
      .catch(() => {
        showSnackbar('更新待办事项失败', 'error');
      });
  };

  const confirmDeleteTodo = (id) => {
    setDeleteTodoId(id);
  };

  const handleDeleteConfirm = () => {
    deleteTodo(deleteTodoId);
    setDeleteTodoId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteTodoId(null);
  };

  const deleteTodo = (id) => {
    api.delete(`/${id}`)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
        showSnackbar('待办事项删除成功', 'success');
      })
      .catch(() => {
        showSnackbar('删除待办事项失败', 'error');
      });
  };

  const openEditDialog = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority || '中');
    setEditDueDate(todo.dueDate || null);
  };

  const closeEditDialog = () => {
    setEditTodo(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('中');
    setEditDueDate(null);
  };

  const saveEdit = () => {
    const formattedDueDate = editDueDate ? format(new Date(editDueDate), 'yyyy-MM-dd') : null;

    api.put(`/${editTodo.id}`, { ...editTodo, title: editTitle, description: editDescription, priority: editPriority, dueDate: formattedDueDate })
      .then(() => {
        setTodos(todos.map((t) => (t.id === editTodo.id ? { ...t, title: editTitle, description: editDescription, priority: editPriority, dueDate: formattedDueDate } : t)));
        closeEditDialog();
        showSnackbar('待办事项更新成功', 'success');
      })
      .catch(() => {
        showSnackbar('更新待办事项失败', 'error');
      });
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'completed') {
        return todo.completed;
      } else if (filter === 'uncompleted') {
        return !todo.completed;
      } else {
        return true;
      }
    })
    .filter((todo) => {
      if (searchTerm.trim() === '') {
        return true;
      }
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Show SnackBar function
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            待办事项管理
          </Typography>

          <Box sx={{ marginBottom: 3 }}>
            <TextField
              label="搜索待办事项"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="待办事项标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="优先级"
              select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem value="高">高</MenuItem>
              <MenuItem value="中">中</MenuItem>
              <MenuItem value="低">低</MenuItem>
            </TextField>
            <DatePicker
              label="截止日期"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button onClick={addTodo} variant="contained" color="primary" size="large">
              添加待办事项
            </Button>
          </Box>

          <Box sx={{ marginY: 3, textAlign: 'center' }}>
            <ButtonGroup variant="outlined">
              <Button onClick={() => setFilter('all')} color={filter === 'all' ? 'primary' : 'default'}>
                全部
              </Button>
              <Button onClick={() => setFilter('completed')} color={filter === 'completed' ? 'primary' : 'default'}>
                已完成
              </Button>
              <Button onClick={() => setFilter('uncompleted')} color={filter === 'uncompleted' ? 'primary' : 'default'}>
                未完成
              </Button>
            </ButtonGroup>
          </Box>

          <List>
            {filteredTodos.map((todo) => (
              <ListItem key={todo.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />
                <ListItemText
                  primary={`${todo.title} (优先级: ${todo.priority})`}
                  secondary={`描述: ${todo.description}${todo.dueDate ? `, 截止日期: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}`}
                />
              </ListItem>
            ))}
          </List>

          {/* 编辑对话框 */}
          <Dialog open={Boolean(editTodo)} onClose={closeEditDialog}>
            <DialogTitle>编辑待办事项</DialogTitle>
            <DialogContent>
              <TextField
                label="标题"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="描述"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="优先级"
                select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="高">高</MenuItem>
                <MenuItem value="中">中</MenuItem>
                <MenuItem value="低">低</MenuItem>
              </TextField>
              <DatePicker
                label="截止日期"
                value={editDueDate}
                onChange={(newValue) => setEditDueDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeEditDialog} color="secondary">
                取消
              </Button>
              <Button onClick={saveEdit} color="primary">
                保存
              </Button>
            </DialogActions>
          </Dialog>

          {/* 删除确认对话框 */}
          <Dialog open={Boolean(deleteTodoId)} onClose={handleDeleteCancel}>
            <DialogTitle>确认删除</DialogTitle>
            <DialogContent>
              您确定要删除此待办事项吗？
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel} color="secondary">
                取消
              </Button>
              <Button onClick={handleDeleteConfirm} color="primary">
                删除
              </Button>
            </DialogActions>
          </Dialog>

          {/* SnackBar 提示框 */}
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
