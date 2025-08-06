const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./src/routes/postRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Travel Blog API is working ' });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.log(' MongoDB connection error:', err));

module.exports = app;



