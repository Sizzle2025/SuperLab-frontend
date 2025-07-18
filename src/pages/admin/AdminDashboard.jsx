import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Home from './Home';
import AssignTask from './AssignTask';
import TaskList from './TaskList';
import StaffList from './StaffList';
import CreateStaff from './CreateStaff';
import LocationTracking from './LocationTracking';
import { Box } from '@mui/material';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminNavbar onMenuClick={() => setOpen(true)} />
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 8, px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="assign-task" element={<AssignTask />} />
          <Route path="task-list" element={<TaskList />} />
          <Route path="staff-list" element={<StaffList />} />
          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="location" element={<LocationTracking />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminDashboard;
