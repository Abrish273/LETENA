const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Add other fields as needed
  },
  {
    timestamps: true,
  }
);

const Competition = mongoose.model("Competition", competitionSchema);

module.exports = Competition;
