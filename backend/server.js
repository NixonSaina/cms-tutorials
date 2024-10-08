const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authMiddleware } = require('./routes/auth');  // Import authMiddleware
const authRoutes = require('./routes/auth').router;   // Import authentication routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cms-tutorials', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database: cms-tutorials');
});

// Tutorial Schema
const tutorialSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

// Routes

// Get all tutorials (public route)
app.get('/api/tutorials', async (req, res) => {
  const tutorials = await Tutorial.find();
  res.json(tutorials);
});

// Create a tutorial (protected route)
app.post('/api/tutorials', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const tutorial = new Tutorial({ title, content });
  await tutorial.save();
  res.status(201).send(tutorial);
});

// Update a tutorial (protected route)
app.put('/api/tutorials/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.status(200).send(tutorial);
});

// Add the authentication routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
