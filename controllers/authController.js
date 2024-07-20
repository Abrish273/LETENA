const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");

// Register a new user
const register = async (req, res) => {
  try {
    // Extract user details from request body
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !dateOfBirth ||
      !gender ||
      !address ||
      !phoneNumber
    ) {
      res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user with email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
    });

    // Save user to database
    const saveduser = await newUser.save();

    const tokenPayload = {
      userId: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      dateOfBirth: newUser.dateOfBirth,
      gender: newUser.gender,
      address: newUser.address,
      phoneNumber: newUser.phoneNumber,
      isPaidUser: newUser.isPaidUser,
    };
    console.log("tokenPayload", tokenPayload);

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login existing user
const login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "email and password is required!" });
    }

    // Check if user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenPayload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      phoneNumber: user.phoneNumber,
      isPaidUser: user.isPaidUser,
    };
    // Generate JWT token
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
};
