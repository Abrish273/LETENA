const User = require("../models/userModel");
const Achievement = require("../models/achievementModel");
const Badge = require("../models/badgeModel");
const Challenge = require("../models/challengeModel");
const Competition = require("../models/competitionModel");

// Award points to a user for completing a task
const awardPoints = async (req, res) => {
  try {
    console.log("req", req._user);
    const { _id } = req._user;
    const { points } = req.body;

    const user = await User.findByIdAndUpdate(
      { _id },
      { $inc: { points: points } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Points awarded successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Grant an achievement to a user
const grantAchievement = async (req, res) => {
  try {
    const { _id } = req._user;

    const { achievementId } = req.body;

    // Update user's achievements
    const user = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { achievements: achievementId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Achievement granted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Grant a badge to a user
const grantBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;

    // Update user's badges
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { badges: badgeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Badge granted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Enroll a user in a challenge
const enrollInChallenge = async (req, res) => {
  try {
    const { userId, challengeId } = req.body;

    // Update user's challenges
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { challenges: challengeId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User enrolled in challenge successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Join a competition
const joinCompetition = async (req, res) => {
  try {
    const { userId, competitionId } = req.body;

    // Update user's competitions
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { competitions: competitionId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User joined competition successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  awardPoints,
  grantAchievement,
  grantBadge,
  enrollInChallenge,
  joinCompetition,
};
