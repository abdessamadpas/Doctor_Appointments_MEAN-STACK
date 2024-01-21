const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  medicalCondition: String,
  
  isConfirmed: { type: Boolean, default: false },
 
}, { timestamps: true});

module.exports = mongoose.model("Appointment", appointmentSchema);
