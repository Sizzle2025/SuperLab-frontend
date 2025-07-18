import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Grid
} from '@mui/material';

const CreateStaff = () => {
  const [form, setForm] = useState({
    name: '',
    staffId: '',
    password: '',
    contactNumber: '',
    department: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('https://superlab-backend-ucpo.onrender.com/api/staff/create', form);
      setMessage(res.data.msg);
      setForm({
        name: '',
        staffId: '',
        password: '',
        phone: '',
        department: ''
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create staff');
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 700,
        mx: 'auto',
        minHeight: '80vh',
        // background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, width: '100%', backgroundColor: '#fff' }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Create New Staff
        </Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                label="Staff Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item>
              <TextField
                label="Staff ID / Username"
                name="staffId"
                fullWidth
                value={form.staffId}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={form.password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item>
              <TextField
                label="Phone Number"
                name="contactNumber"
                fullWidth
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Department"
                name="department"
                fullWidth
                value={form.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <Button variant="contained" fullWidth type="submit" size="large">
                Register Staff
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateStaff;
