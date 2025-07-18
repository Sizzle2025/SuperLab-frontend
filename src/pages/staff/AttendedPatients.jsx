import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

const AttendedPatients = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const staffId = localStorage.getItem('staffId');

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const res = await axios.get(`https://superlab-backend-ucpo.onrender.com/api/tasks/staff/${staffId}`);
      const completed = res.data.filter(task => task.status === 'Completed');
      setCompletedTasks(completed);
    } catch (err) {
      console.error('Failed to load completed tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (value) =>
    value ? new Date(value).toLocaleString('en-IN') : '—';

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Attended Patients (Completed Tasks)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : completedTasks.length === 0 ? (
        <Typography variant="body1">No completed tasks found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 1000 }} aria-label="completed tasks table">
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Task Type</strong></TableCell>
                <TableCell><strong>Sample Type</strong></TableCell>
                <TableCell><strong>Patient Name</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Reached At</strong></TableCell>
                <TableCell><strong>Sample Collected</strong></TableCell>
                <TableCell><strong>Submitted to Lab</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.taskType}</TableCell>
                  <TableCell>{task.sampleType}</TableCell>
                  <TableCell>{task.patientName}</TableCell>
                  <TableCell>{task.contactNumber}</TableCell>
                  <TableCell>{task.patientAddress}</TableCell>
                  <TableCell>{formatDateTime(task.reachedAt)}</TableCell>
                  <TableCell>{formatDateTime(task.sampleCollectedAt)}</TableCell>
                  <TableCell>{formatDateTime(task.submittedToLabAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AttendedPatients;
