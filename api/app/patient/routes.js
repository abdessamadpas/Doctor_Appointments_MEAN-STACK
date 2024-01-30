const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { checkRole } = require("../../middlewares/checkRole");
const { getAllPatients, getPatient, updatePatient, deletePatient } = require("../../controllers/patient");

router.get("/all", checkRole(["patient", "admin", "doctor"]), getAllPatients);
router.get("/:id",   checkRole(["patient", "admin"]), getPatient);
router.put("/:id",  checkRole(["patient", "admin"]), updatePatient);
router.delete("/:id",  checkRole(["patient", "admin"]), deletePatient);

module.exports = router;
