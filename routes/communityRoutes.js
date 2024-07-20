const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");

// Example protected route
// POST /api/community/create-group-chat
router.post(
  "/create-group-chat",
  authMiddleware,
  communityController.createGroupChat
);

// POST /api/community/create-community-page
router.post(
  "/create-community-page",
  authMiddleware,
  communityController.createCommunityPage
);

module.exports = router;
