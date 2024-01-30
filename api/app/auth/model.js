const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    phone : {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    photo: String,
    bio : String,
    isDoctor: {
      type: Boolean,
      default: false,
    },

    isPatient: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Array,
      default: [],
    },

    seennotifications: {
      type: Array,
      default: [],
    },
    

    isSuspended: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
