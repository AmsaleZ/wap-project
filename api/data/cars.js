const mongoose = require("mongoose");
const cars = new mongoose.Schema(
  {
    newOrUsed: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    }
  },
  { versionKey: false }
);

mongoose.model(process.env.DB_TEAM_MODEL, cars, "Cars");
