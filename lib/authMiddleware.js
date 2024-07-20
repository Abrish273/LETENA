const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config");

const authMiddleware = async (req, res, next) => {
  // Get token from headers
  const token = req.header("Authorization");

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: "Authorization denied, no token" });
  }
  const tokenWithoutBearer = token.split(" ")[1];

  console.log(token);
  try {
    // Verify token
    const decoded = jwt.verify(tokenWithoutBearer, config.JWT_SECRET);

    // Find user by decoded token data
    const user = await User.findById(decoded.userId);

    // Check if user doesn't exist
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authorization denied, user not found" });
    }

    console.log("user", user);

    // Attach user object to request
    req._user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = authMiddleware;
