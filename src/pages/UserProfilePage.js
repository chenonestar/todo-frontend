import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Paper, Typography, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api'; // 假设你有用户管理的 API 客户端

function UserProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      userApi.get('/profile')
        .then(response => {
          setUsername(response.data.username);
          setEmail(response.data.email);
        })
        .catch(() => {
          navigate('/login');
        });
    }
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (!username || !email) {
      showSnackbar('请填写所有必填项', 'warning');
      return;
    }
    userApi.put('/profile', { username, email })
      .then(() => {
        showSnackbar('资料更新成功', 'success');
        navigate('/');
      })
      .catch(() => {
        showSnackbar('资料更新失败，请重试', 'error');
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          用户资料
        </Typography>
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              fullWidth
            >
              更新资料
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              fullWidth
            >
              取消
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* SnackBar 提示框 */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default UserProfilePage;
