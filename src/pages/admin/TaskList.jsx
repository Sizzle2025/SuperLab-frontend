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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
} from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks/list');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        status: newStatus,
      });
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const formatDateTime = (value) =>
    value ? new Date(value).toLocaleString('en-IN') : '—';

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>

      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Status Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Task Type</TableCell>
                <TableCell>Sample</TableCell>
                <TableCell>Assigned Staff</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reached At</TableCell>
                <TableCell>Collected At</TableCell>
                <TableCell>Submitted At</TableCell>
                <TableCell>Photo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.patientName || '—'}</TableCell>
                  <TableCell>{task.taskType || '—'}</TableCell>
                  <TableCell>{task.sampleType || '—'}</TableCell>
                  <TableCell>
                    {task.assignedStaff
                      ? `${task.assignedStaff.name} (${task.assignedStaff.staffId})`
                      : 'N/A'}
                  </TableCell>
                  <TableCell sx={{ minWidth: 180 }}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Status:
                      </Typography>
                      <Select
                        value={task.status || 'Pending'}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                        size="small"
                        sx={{ width: 120 }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(task.date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>{formatDateTime(task.reachedAt)}</TableCell>
                  <TableCell>{formatDateTime(task.sampleCollectedAt)}</TableCell>
                  <TableCell>{formatDateTime(task.submittedToLabAt)}</TableCell>
                  <TableCell>
                    {task.photoProof ? (
                      <Link
                        href={`http://localhost:5000/uploads/${task.photoProof}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <img
                          src={`http://localhost:5000/uploads/${task.photoProof}`}
                          alt="Proof"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #ccc',
                          }}
                        />
                      </Link>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TaskList;
