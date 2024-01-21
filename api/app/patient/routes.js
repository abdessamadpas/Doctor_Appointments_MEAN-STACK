const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { checkRole } = require("../../middlewares/checkRole");
const Patient = require("../patient/model");

// Route to add a new patient
const addPatient = router.post("/add", checkRole(["admin"]), async (req, res) => {
  try {
    const { nom, prenom } = req.body;

    // Create a new patient
    const newPatient = await Patient.create({
      nom,
      prenom,
      role: "patient",
    });

    res.json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding patient");
  }
});

module.exports = {addPatient};