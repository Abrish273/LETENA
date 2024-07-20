const subscriptionMiddleware = (req, res, next) => {
  const user = req.user;

  // Check if user is subscribed
  if (user.subscription === "paid") {
    // User has paid subscription, proceed
    next();
  } else {
    // User has free subscription, handle accordingly
    res
      .status(403)
      .json({
        message: "Access denied. Upgrade to paid subscription for full access.",
      });
  }
};

module.exports = subscriptionMiddleware;
