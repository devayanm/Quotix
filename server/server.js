const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api', newsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
