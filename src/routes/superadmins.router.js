const express = require("express");
const superadminsController = require("../controllers/superadmins.controller.js");

const router = express.Router();

router.post("/signin", superadminsController.signin);
router.post("/reset", superadminsController.reset);
router.post("/createuser", superadminsController.createuser);

module.exports = router;
