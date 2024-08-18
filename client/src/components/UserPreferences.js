import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { getUserPreferences, updateUserPreferences } from '../services/apiService';

const UserPreferences = ({ username }) => {
  const [preferences, setPreferences] = useState({ topics: '', region: '' });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getUserPreferences(username);
        setPreferences(data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateUserPreferences(username, preferences);
      alert('Preferences updated!');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6">Update Preferences</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Topics"
            name="topics"
            value={preferences.topics}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Region"
            name="region"
            value={preferences.region}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>Save Preferences</Button>
    </Box>
  );
};

export default UserPreferences;
