import React from 'react';
import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items'; // Assuming this is where your menu items are defined
import { useSelector } from 'react-redux';

const Navigation = () => {
  const loggedInUser = useSelector(state => state.login.loggedInUser);

  // Determine which menu item to render based on user's role
  const renderMenuItem = () => {
    switch (loggedInUser.role) {
      case 'supervisor':
        return menuItem.items.find(item => item.id === 'group-dashboard');
      case 'user':
        return menuItem.items.find(item => item.id === 'support');
      default:
        return null;
    }
  };

  const menuItemToRender = renderMenuItem();

  return (
    <Box sx={{ pt: 2 }}>
      {menuItemToRender ? (
        <NavGroup key={menuItemToRender.id} item={menuItemToRender} />
      ) : (
        <Typography variant="h6" color="error" align="center">
          No menu item available for this role
        </Typography>
      )}
    </Box>
  );
};

export default Navigation;
