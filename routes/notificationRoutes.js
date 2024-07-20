const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

// Example protected route
// POST /api/notification/send-notification
router.post(
  "/send-notification",
  authMiddleware,
  subscriptionMiddleware,
  notificationController.sendNotification
);

// POST /api/notification/trigger-emergency-alert
router.post(
  "/trigger-emergency-alert",
  authMiddleware,
  notificationController.triggerEmergencyAlert
);

module.exports = router;
