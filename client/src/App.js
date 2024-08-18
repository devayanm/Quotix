import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewsFeed from './pages/NewsFeed';
import UserPreferences from './pages/UserPreferences';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewsFeed />} />
      <Route path="/preferences" element={<UserPreferences />} />
    </Routes>
  );
};

export default App;

