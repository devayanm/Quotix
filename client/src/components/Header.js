import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import DarkModeToggle from './DarkModeToggle';
// import Logo from '../assets/logo.png';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <img alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Quotix
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/preferences">Preferences</Button>
      <DarkModeToggle />
    </Toolbar>
  </AppBar>
);

export default Header;
