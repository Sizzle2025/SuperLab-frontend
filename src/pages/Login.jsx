import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    // Send only username and password
    const res = await axios.post('https://superlab-backend-ucpo.onrender.com/api/auth/login', {
      username: form.username,
      password: form.password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);

    if (user.role === 'staff' && user.staffId) {
      localStorage.setItem('staffId', user.staffId);
    } else {
      localStorage.removeItem('staffId');
    }

    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/staff/dashboard');
    }
  } catch (err) {
    setError(err.response?.data?.msg || 'Login failed');
  }
};


  return (
    <Box
      sx={{
        height: '100dvh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 4 },
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#ffffffee',
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Lab Portal Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username (admin or STAFF-001)"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
