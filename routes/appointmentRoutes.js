const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

// Example protected route
// POST /api/appointment/schedule-appointment
router.post(
  "/schedule-appointment",
  authMiddleware,
  subscriptionMiddleware,
  appointmentController.scheduleAppointment
);

// POST /api/appointment/conduct-telemedicine-session
router.post(
  "/conduct-telemedicine-session",
  authMiddleware,
  subscriptionMiddleware,
  appointmentController.conductTelemedicineSession
);

module.exports = router;
planRoutes;