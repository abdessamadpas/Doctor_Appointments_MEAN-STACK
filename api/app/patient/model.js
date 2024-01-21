const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    medicalCondition: String,
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
}, { timestamps: true});
    