const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized.');

    const user = await userService.validateUser(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized.' });
  }
};

module.exports = authenticate;
