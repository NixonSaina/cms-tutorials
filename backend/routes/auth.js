// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send('User already exists.');

  const user = new User({ username, password });
  await user.save();
  res.status(201).send('User registered.');
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials.');

  const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('No token provided.');

  jwt.verify(token, 'jwtSecret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token.');
    req.userId = decoded.id;
    next();
  });
}

module.exports = { router, authMiddleware };
