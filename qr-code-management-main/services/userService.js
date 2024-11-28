const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userService = {
  async signup(username, email, password) {
    // Check if the user already exists
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  },

  async login(email, password) {
    // Find user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid Email or password.');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      throw new Error('Invalid email or Password.');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { token, user: { id: user.id, username: user.username, email: user.email } };
  },

  async validateUser(token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findUserById(decoded.id);
      if (!user) throw new Error('User not found.');

      return { id: user.id, username: user.username, email: user.email };
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  },
};

module.exports = userService;
