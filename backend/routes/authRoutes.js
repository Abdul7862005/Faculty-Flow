const express = require("express");
const router = express.Router();

//  FIX: Import the whole controller object (no curly braces)
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;