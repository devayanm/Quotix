const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  preferences: {
    topics: [String],
    region: String
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
