const User = require("../models/users.model.js");
const userOps = require("../lib/userOps");

exports.signin = async (req, res) => {
  return userOps.userSignin(req, res, User);
};

exports.reset = async (req, res) => {
  return userOps.userReset(req, res, User);
};
