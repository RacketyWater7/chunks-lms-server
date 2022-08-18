const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  id: {
    type: String,
  },
});

// Connects userLoginSchema with the "users" collection
module.exports = mongoose.model("User", userLoginSchema);
