const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', newsRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(err => console.error('Database connection error:', err));
