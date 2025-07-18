import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StaffSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const items = [
    { label: 'Assigned Tasks', path: '/staff/dashboard/assigned' },
    { label: 'Attended Patients', path: '/staff/dashboard/attended' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <h3>Staff Menu</h3>
      </Box>
      <List>
        {items.map((item) => (
          <ListItemButton key={item.path} onClick={() => {
            navigate(item.path);
            onClose(); // auto-close on mobile
          }}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default StaffSidebar;
