import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const preferencesOptions = {
  categories: ['Technology', 'Business', 'Sports', 'Health', 'Entertainment', 'Science'],
  regions: ['Global', 'USA', 'Europe', 'Asia', 'Africa', 'Australia'],
};

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    categories: [],
    regions: [],
  });

  useEffect(() => {
    // Load preferences from local storage if available
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], name]
        : prev[category].filter((item) => item !== name),
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Preferences saved successfully!');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        User Preferences
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select News Categories</FormLabel>
        <FormGroup row>
          {preferencesOptions.categories.map((category) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.categories.includes(category)}
                  onChange={(e) => handleCheckboxChange(e, 'categories')}
                  name={category}
                />
              }
              label={category}
              key={category}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 4 }}>
        <FormLabel component="legend">Select News Regions</FormLabel>
        <FormGroup row>
          {preferencesOptions.regions.map((region) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.regions.includes(region)}
                  onChange={(e) => handleCheckboxChange(e, 'regions')}
                  name={region}
                />
              }
              label={region}
              key={region}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleSavePreferences}>
        Save Preferences
      </Button>
    </Container>
  );
};

export default Preferences;
