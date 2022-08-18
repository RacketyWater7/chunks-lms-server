const mongoose = require("mongoose");

const superuserLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

// Connects planetSchema with the "planets" collection
module.exports = mongoose.model("SuperAdmin", superuserLoginSchema);
