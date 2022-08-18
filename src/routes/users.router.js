const express = require("express");
const usersController = require("../controllers/users.controller.js");

const router = express.Router();

router.post("/signin", usersController.signin);
router.post("/reset", usersController.reset);

module.exports = router;
