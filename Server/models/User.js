const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  budgets: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema);
