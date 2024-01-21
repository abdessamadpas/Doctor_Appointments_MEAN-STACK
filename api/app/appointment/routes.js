const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/verifyToken");
const { checkRole } = require("../../middlewares/checkRole");
const Appointment = require("../appointment/model");
const Patient = require("../patient/model");
const Doctor = require("../doctor/model");
const {
  bookAppointment,
  getAllAppointments,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointment,
  deleteAppointment,
  getConfirmedAppointments,
  getUnconfirmedAppointments,
  getConfirmedPatientAppointments,
  getConfirmedDoctorAppointments,
  getUnconfirmedPatientAppointments,
  getUnconfirmedDoctorAppointments,
  confirmAppointment,
  getConfirmedDoctorPatientAppointments,
} = require("../../controllers/appointment");

router.post("/book", checkRole(["doctor", "patient"]), bookAppointment);
router.get("/all", getAllAppointments);
router.get("/patient/:id", getPatientAppointments);
router.get("/doctor/:id", getDoctorAppointments);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.put("/confirm/:id", confirmAppointment);
router.get("/confirmed", getConfirmedAppointments);
router.get("/unconfirmed", getUnconfirmedAppointments);
router.get("/confirmed/patient/:id", getConfirmedPatientAppointments);
router.get("/confirmed/doctor/:id", getConfirmedDoctorAppointments);
router.get("/unconfirmed/patient/:id", getUnconfirmedPatientAppointments);
router.get("/unconfirmed/doctor/:id", getUnconfirmedDoctorAppointments);
router.get(
  "/confirmed/doctor/:doctorId/patient/:patientId",
  getConfirmedDoctorPatientAppointments
);

module.exports = router;
