const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,

  isDoctor: {
    type: Boolean,
    default: false,
  },
  specialty: String,

  isPatient: {
    type: Boolean,
    default: false,
  },

  healthConditions: [String],


  isSuspended: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
