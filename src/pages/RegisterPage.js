import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    authApi.post('/register', { username, password })
      .then(() => {
        alert('注册成功，请登录');
        navigate('/login');  // 注册成功后跳转到登录页面
      })
      .catch(() => {
        alert('注册失败，请重试');
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>注册</Typography>
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
        <Button onClick={handleRegister} variant="contained" color="primary" fullWidth>
          注册
        </Button>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
