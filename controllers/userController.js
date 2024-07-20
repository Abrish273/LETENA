const User = require("../models/User");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Fetch user details from database
    const userId = req.userId; // Extracted from JWT middleware
    const user = await User.findById(userId).populate(
      "achievements badges challenges competitions"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Extract updated user details from request body
    const { firstName, lastName, address, phoneNumber } = req.body;
    const userId = req.userId; // Extracted from JWT middleware

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, address, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
