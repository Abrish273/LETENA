const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(config.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gamification", require("./routes/gamificationRoutes"));
// app.use("/api/assessment", require("./routes/assessmentRoutes"));
// app.use("/api/community", require("./routes/communityRoutes"));
// app.use("/api/appointment", require("./routes/appointmentRoutes"));
// app.use("/api/plan", require("./routes/planRoutes"));
// app.use("/api/notification", require("./routes/notificationRoutes"));

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
