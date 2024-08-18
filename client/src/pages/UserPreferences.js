import React, { useState } from 'react';
import axios from 'axios';

const UserPreferences = () => {
  const [topics, setTopics] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/user/username/preferences', { topics: topics.split(','), region });
      alert('Preferences updated!');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Topics:
        <input
          type="text"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          placeholder="Comma-separated topics"
        />
      </label>
      <label>
        Region:
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </label>
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default UserPreferences;
