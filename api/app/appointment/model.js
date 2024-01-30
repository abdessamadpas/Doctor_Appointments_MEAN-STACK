const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "confirm", "decline"],
      default: "pending",
    },
    date: {
      type: Date,
    
    },
    email: String,
    phone: String,
    city  : String,
    timePicked: String,
    medicalCondition: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
