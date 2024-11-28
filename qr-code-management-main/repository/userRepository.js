const User = require('../models/user');

const userRepository = {
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  },

  async findUserByEmail(email) {
    return User.findOne({ email });
  },

  async findUserById(userId) {
    return User.findById(userId);
  },
};

module.exports = userRepository;
