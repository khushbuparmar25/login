const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  author: {
    type: String
  }

}, { collection: 'users'});

const User = mongoose.model('User', UserSchema);
module.exports = exports = User;