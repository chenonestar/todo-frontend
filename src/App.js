import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './components/TodoPage';
import { Container, Paper, Typography, Button, TextField } from '@mui/material';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todos');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username && password) { // 添加简单的用户名和密码校验
      const token = 'dummy-token'; // 模拟令牌生成
      localStorage.setItem('token', token);
      navigate('/todos');
    } else {
      alert('请输入用户名和密码');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(''); // 清除用户名
    setPassword(''); // 清除密码
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={
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
            <Button variant="contained" color="primary" sx={{ margin: 1 }} onClick={handleLogin}>登录</Button>
            <Button variant="contained" color="secondary" sx={{ margin: 1 }} onClick={() => navigate('/register')}>注册</Button>
          </Paper>
        </Container>
      } />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={() => navigate('/')} />} />
      <Route path="/todos" element={<TodoPage onLogout={handleLogout} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

