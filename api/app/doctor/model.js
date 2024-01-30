const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  specialization: String,
  experience: {
    type: Number,
    default: 0,
  },
  qualification: {
    type: String,
    default: "",
  },

  rating: {
    type: Number,
    default: 0,
  },
  city : {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "Good Doctor",
  },

  fees: {
    type: Number,
    default: 0,
  },
  dailyAppointmentsNumber: {
    type: Number,
    default:  10,    
  },
  isBusy: { type: Boolean, default: false },
});
module.exports = mongoose.model("Doctor", doctorSchema);
