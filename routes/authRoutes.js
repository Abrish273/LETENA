const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../lib/authMiddleware");

// POST /api/auth/login
router.post("/login", authController.login);

// POST /api/auth/register
router.post("/register", authController.register);

// GET /api/auth/user-profile
// router.get("/user-profile", authMiddleware, authController.getUserProfile);

module.exports = router;
