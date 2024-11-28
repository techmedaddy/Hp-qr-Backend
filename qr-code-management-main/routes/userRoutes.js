const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { authRateLimiter, qrRateLimiter, generalRateLimiter } = require('../middleware/rateLimiter');

// Signup Route
router.post('/signup', authRateLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userService.signup(username, email, password);
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login Route
router.post('/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json({ message: 'Login successful.', token: result.token, user: result.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Token Validation Route
router.get('/validate', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token not provided.');

    const user = await userService.validateUser(token);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
