import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Autocomplete,
  Paper,
} from '@mui/material';

const AssignTask = () => {
  const [form, setForm] = useState({
    taskType: 'B2B',
    patientName: '',
    patientAddress: '',
    patientLocation: '',
    sampleType: '',
    contactNumber: '',
    assignedStaff: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get('https://superlab-backend-ucpo.onrender.com/api/staff/list');
        setStaffList(res.data);
      } catch (err) {
        console.error('Failed to load staff:', err);
      }
    };

    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const payload = {
        ...form,
        assignedStaff: selectedStaff?._id,
      };

      const res = await axios.post('https://superlab-backend-ucpo.onrender.com/api/tasks/assign', payload);
      setMsg(res.data.msg);
      setForm({
        taskType: 'B2B',
        patientName: '',
        patientAddress: '',
        patientLocation: '',
        sampleType: '',
        contactNumber: '',
        assignedStaff: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSelectedStaff(null);
    } catch (err) {
      console.error(err);
      setMsg('Task assignment failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f1f4f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Assign Task
        </Typography>

        {msg && (
          <Typography variant="body2" color="secondary" align="center" sx={{ mb: 2 }}>
            {msg}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Task Type"
            name="taskType"
            value={form.taskType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="B2B">B2B (Patient already gave sample)</MenuItem>
            <MenuItem value="B2C">B2C (Staff needs to collect sample)</MenuItem>
          </TextField>

          <TextField
            label="Sample Type"
            name="sampleType"
            value={form.sampleType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Patient Name"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Patient Address"
            name="patientAddress"
            value={form.patientAddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Location Link / Landmark"
            name="patientLocation"
            value={form.patientLocation}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Contact Number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Autocomplete
            options={staffList}
            getOptionLabel={(option) => `${option.name} (${option.staffId})`}
            value={selectedStaff}
            onChange={(e, newValue) => setSelectedStaff(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Select Staff" fullWidth margin="normal" required />
            )}
          />

          <TextField
            label="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Assign Task
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AssignTask;
