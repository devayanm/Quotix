const User = require('../models/userModel');

const getUserPreferences = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user.preferences);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user preferences' });
  }
};

const updateUserPreferences = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user preferences' });
  }
};

module.exports = { getUserPreferences, updateUserPreferences };
