import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', path: '/admin/dashboard' },
    { label: 'Assign Task', path: '/admin/dashboard/assign-task' },
    { label: 'Task List', path: '/admin/dashboard/task-list' },
    { label: 'Staff List', path: '/admin/dashboard/staff-list' },
    { label: 'Create Staff', path: '/admin/dashboard/create-staff' },
    { label: 'Location Tracking', path: '/admin/dashboard/location' },
    { label: 'Logout', path: '/' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{ '& .MuiDrawer-paper': { width: 240 } }}
    >
      <Box sx={{ p: 2 }}><h3>Admin Menu</h3></Box>
      <List>
        {items.map((item) => (
          <ListItemButton key={item.label} onClick={() => {
            navigate(item.path);
            onClose();
          }}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
