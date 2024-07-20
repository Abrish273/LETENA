const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

// Example protected route
// POST /api/plan/manage-subscription
router.post(
  "/manage-subscription",
  authMiddleware,
  subscriptionMiddleware,
  planController.manageSubscription
);

// POST /api/plan/handle-payment
router.post(
  "/handle-payment",
  authMiddleware,
  subscriptionMiddleware,
  planController.handlePayment
);

module.exports = router;
