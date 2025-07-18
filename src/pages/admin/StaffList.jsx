import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, Collapse, Button, Alert
} from '@mui/material';
import { Delete, ExpandMore } from '@mui/icons-material';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff/list');
      setStaffList(res.data);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/staff/delete/${id}`);
      setMessage('Staff deleted successfully');
      fetchStaff();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Delete failed');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Staff List
      </Typography>

      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Staff ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Current Task</strong></TableCell>
              <TableCell><strong>Finished Tasks</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {staffList.map((staff) => (
              <React.Fragment key={staff._id}>
                <TableRow>
                  <TableCell>{staff.staffId}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.contactNumber || 'N/A'}</TableCell>
                  <TableCell>{staff.department || 'N/A'}</TableCell>
                  <TableCell>
                    {staff.currentTask ? (
                      <>
                        {staff.currentTask.taskType}{' '}
                        <Chip
                          label={staff.currentTask.status}
                          size="small"
                          color={
                            staff.currentTask.status === 'Completed'
                              ? 'success'
                              : staff.currentTask.status === 'In Progress'
                              ? 'warning'
                              : 'default'
                          }
                          sx={{ ml: 1 }}
                        />
                      </>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        None
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{staff.completedTasks?.length || 0}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      endIcon={<ExpandMore />}
                      onClick={() => toggleExpand(staff._id)}
                    >
                      View
                    </Button>
                    <IconButton color="error" onClick={() => handleDelete(staff._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={7} sx={{ p: 0, border: 0 }}>
                    <Collapse in={expanded[staff._id]}>
                      <Box sx={{ px: 2, py: 1 }}>
                        <Typography fontWeight="bold" variant="body2" gutterBottom>
                          Completed Task History:
                        </Typography>
                        {staff.completedTasks && staff.completedTasks.length > 0 ? (
                          staff.completedTasks.map((task, idx) => (
                            <Typography key={idx} variant="body2" sx={{ pl: 1 }}>
                              • {task.taskType} - {task.sampleType} on{' '}
                              {new Date(task.date).toLocaleDateString('en-IN')}
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary" sx={{ pl: 1 }}>
                            No completed tasks.
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffList;
