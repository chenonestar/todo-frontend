import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './components/TodoPage';
import UserProfilePage from './pages/UserProfilePage';
import { Container, Paper, Typography, Button, TextField } from '@mui/material';
import { authApi } from './api';

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 获取当前的 URL 信息
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    // 仅当用户访问根路径时，检查令牌并导航到 /todos
    if (token && location.pathname === '/') {
      navigate('/todos');
    }
  }, [navigate, location]);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await authApi.post('/login', { username, password });
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        navigate('/todos');
      } catch (error) {
        alert('登录失败，请检查用户名和密码');
      }
    } else {
      alert('请输入用户名和密码');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setPassword('');
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>欢迎</Typography>
              <TextField
                label="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="密码"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" sx={{ margin: 1 }} onClick={handleLogin}>
                登录
              </Button>
              <Button variant="contained" color="secondary" sx={{ margin: 1 }} onClick={() => navigate('/register')}>
                注册
              </Button>
            </Paper>
          </Container>
        }
      />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={() => navigate('/')} />} />
      <Route path="/todos" element={<TodoPage onLogout={handleLogout} />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
