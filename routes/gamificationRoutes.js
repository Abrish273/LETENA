const express = require("express");
const router = express.Router();
const gamificationController = require("../controllers/gamificationController");
const authMiddleware = require("../lib/authMiddleware");
const subscriptionMiddleware = require("../lib/subscriptionMiddleware");

// POST /api/gamification/award-points
router.post(
  "/award-points",
  authMiddleware,
  gamificationController.awardPoints
);

// POST /api/gamification/grant-achievement
router.post(
  "/grant-achievement",
  authMiddleware,
  gamificationController.grantAchievement
);

// POST /api/gamification/grant-badge
router.post("/grant-badge", authMiddleware, gamificationController.grantBadge);

// POST /api/gamification/enroll-challenge
router.post(
  "/enroll-challenge",
  authMiddleware,
  gamificationController.enrollInChallenge
);

// POST /api/gamification/join-competition
router.post(
  "/join-competition",
  authMiddleware,
  gamificationController.joinCompetition
);

module.exports = router;
