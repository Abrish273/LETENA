const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

// Example protected route
// POST /api/assessment/conduct-risk-assessment
router.post(
  "/conduct-risk-assessment",
  authMiddleware,
  assessmentController.conductRiskAssessment
);

// POST /api/assessment/provide-health-recommendations
router.post(
  "/provide-health-recommendations",
  authMiddleware,
  subscriptionMiddleware,
  assessmentController.provideHealthRecommendations
);

module.exports = router;
