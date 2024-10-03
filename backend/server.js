// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cms-tutorials', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tutorial Schema
const tutorialSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

// Get all tutorials
app.get('/api/tutorials', async (req, res) => {
  const tutorials = await Tutorial.find();
  res.json(tutorials);
});

// Get a tutorial by ID
app.get('/api/tutorials/:id', async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);
  res.json(tutorial);
});

// Create a new tutorial
app.post('/api/tutorials', async (req, res) => {
  const { title, content } = req.body;
  const tutorial = new Tutorial({ title, content });
  await tutorial.save();
  res.status(201).send(tutorial);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
