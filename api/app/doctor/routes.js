const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { checkRole } = require("../../middlewares/checkRole");
const Doctor = require("../doctor/model");


// Route to add a new doctor
 router.post("/add", checkRole(["admin"]), async (req, res) => {
  try {
    const { nom, prenom } = req.body;
    // Create a new doctor
    const newDoctor = await Doctor.create({
      nom,
      prenom,
      role: "doctor",
    });
    res.json(newDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding doctor");
  }
});



module.exports = router;
