const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    login: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model('users', UserSchema);

module.exports = User;