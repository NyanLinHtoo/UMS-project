const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add username"],
  },
  email: {
    type: String,
    required: [true, "Please add user's email"],
    unique: [true, "Email address is already taken"],
  },
  phone: {
    type: String,
    required: [true, "Please add user's phone"],
  },
  gender: {
    type: String,
    required: [true, "Please add user's gender"],
  },
  role: {
    type: String,
    required: [true, "Please add user role"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
