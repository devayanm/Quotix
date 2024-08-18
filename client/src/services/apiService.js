import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchNews = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/news`, { params: { username } });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getUserPreferences = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/user/${username}/preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

export const updateUserPreferences = async (username, preferences) => {
  try {
    const response = await axios.put(`${API_URL}/user/${username}/preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
