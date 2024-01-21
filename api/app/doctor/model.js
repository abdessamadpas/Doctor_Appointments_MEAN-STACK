const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  specialization: String,
  experience: Number,
  qualification: String,
  description: String,
  fees: Number,
  isBusy: { type: Boolean, default: false },
});
module.exports = mongoose.model("Doctor", doctorSchema);
