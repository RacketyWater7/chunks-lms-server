const express = require("express");

const superadminRoutes = require("./superadmins.router");
const userRoutes = require("./users.router");

const api = express.Router();

api.use("/superadmin", superadminRoutes);
api.use("/user", userRoutes);

api.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Chunks LMS API",
  });
});

module.exports = api;
