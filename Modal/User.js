const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  dob: { type: String },
  address: { type: String },
  country: { type: String },
});

module.exports = mongoose.model("users", User);
