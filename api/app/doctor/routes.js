const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { checkRole } = require("../../middlewares/checkRole");
const {
  getDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getPatientsDoctor,getSuspendedDoctors
} = require("../../controllers/doctor");

// Route to get a doctor by id
router.get("/getDoctor/:id", checkRole(["admin", "doctor"]), getDoctor);

// Route to get all doctors
router.get("/all", checkRole(["admin", "doctor", "patient"]), getAllDoctors);

// Route to update a doctor
router.put("/:id", checkRole(["admin", "doctor"]), updateDoctor);

// Route to delete a doctor
router.delete("/:id", checkRole(["admin", "doctor"]), deleteDoctor);

// Route to get all patients of a doctor
router.get("/:id/patients", checkRole(["admin", "doctor"]), getPatientsDoctor);

router.get("/suspendeddoctors", checkRole(["admin"]), getSuspendedDoctors);
module.exports = router;
