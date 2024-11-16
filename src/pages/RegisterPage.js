import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api'; // 假设你有认证 API 客户端

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && email && password) {
      authApi.post('/register', { username, email, password })
        .then(() => {
          alert('注册成功，请登录');
          navigate('/login');
        })
        .catch(() => {
          alert('注册失败，请重试');
        });
    } else {
      alert('请完整填写用户名、电子邮件和密码');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>注册</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="电子邮件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
          >
            注册
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
