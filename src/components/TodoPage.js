import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Snackbar, Button, Stack, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api';

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import EditTodoDialog from '../components/EditTodoDialog';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import { format } from 'date-fns';

function TodoPage() {
  const navigate = useNavigate();
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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      todoApi.get('/')
        .then((response) => setTodos(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  const addTodo = () => {
    const formattedDueDate = dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : null;

    todoApi.post('/', { title, description, priority, dueDate: formattedDueDate, completed: false })
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
    todoApi.put(`/${todo.id}`, { ...todo, completed: !todo.completed })
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
    todoApi.delete(`/${id}`)
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

    todoApi.put(`/${editTodo.id}`, { ...editTodo, title: editTitle, description: editDescription, priority: editPriority, dueDate: formattedDueDate })
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
            <Typography variant="h4" align="left">
              待办事项管理
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={() => navigate('/profile')}>
                用户资料
              </Button>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                退出登录
              </Button>
            </Stack>
          </Stack>

          {/* 搜索和过滤框 */}
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12} md={8}>
              <TextField
                label="搜索待办事项"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>过滤</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="过滤"
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="completed">已完成</MenuItem>
                  <MenuItem value="uncompleted">未完成</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ marginBottom: 3 }} />

          {/* 添加待办事项表单 */}
          <Box sx={{ marginBottom: 3 }}>
            <TodoForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              priority={priority}
              setPriority={setPriority}
              dueDate={dueDate}
              setDueDate={setDueDate}
              addTodo={addTodo}
            />
          </Box>

          {/* 待办事项列表 */}
          <TodoList todos={filteredTodos} toggleComplete={toggleComplete} openEditDialog={openEditDialog} confirmDeleteTodo={confirmDeleteTodo} />

          {/* 编辑和删除对话框 */}
          <EditTodoDialog
            open={Boolean(editTodo)}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            editDueDate={editDueDate}
            setEditDueDate={setEditDueDate}
            closeEditDialog={closeEditDialog}
            saveEdit={saveEdit}
          />
          <DeleteConfirmationDialog open={Boolean(deleteTodoId)} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteConfirm} />

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

export default TodoPage;
