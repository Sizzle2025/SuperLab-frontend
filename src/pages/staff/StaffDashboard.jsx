import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffSidebar from '../../components/staff/StaffSidebar';
import StaffNavbar from '../../components/staff/StaffNavbar';
import StaffHome from './StaffHome'; // ✅ Import the new component
import AssignedTasks from './AssignedTasks';
import AttendedPatients from './AttendedPatients';
import { Box } from '@mui/material';
import LocationSender from './LocationSender'; // adjust path as needed

const StaffDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StaffNavbar onMenuClick={() => setOpen(true)} />
      <StaffSidebar open={open} onClose={() => setOpen(false)} />
      <LocationSender />

      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 8, px: 2 }}>
        <Routes>
          <Route path="/" element={<StaffHome />} /> {/* ✅ New route */}
          <Route path="assigned" element={<AssignedTasks />} />
          <Route path="attended" element={<AttendedPatients />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </>
  );
};

export default StaffDashboard;