const express = require("express");
const router = express.Router();
const { checkRole } = require("../../middlewares/checkRole");

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
  changeStatusAppointment,
  getConfirmedDoctorPatientAppointments,
  dailyAppointmentsBooked,
  getConfirmedAppointmentsDay,
  getNextAppoitments,
} = require("../../controllers/appointment");

router.post("/book", checkRole(["doctor", "patient", "admin"]), bookAppointment);
router.get("/all", getAllAppointments);
router.post("/dailyAppointmentsBooked/:id", dailyAppointmentsBooked); 
router.get("/patient/:id", getPatientAppointments);
router.get("/doctor/:id", getDoctorAppointments);
router.get("/patient/:id", getNextAppoitments);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.put("/confirm/:id", changeStatusAppointment);
router.get("/confirmed", getConfirmedAppointments);
router.get("/unconfirmed", getUnconfirmedAppointments);
router.get("/confirmed/patient/:id", getConfirmedPatientAppointments);
router.get("/confirmed/doctor/:id", getConfirmedDoctorAppointments);
router.get("/unconfirmed/patient/:id", getUnconfirmedPatientAppointments);
router.get("/unconfirmed/doctor/:id", getUnconfirmedDoctorAppointments);
router.post("/confirmed/today/:id", getConfirmedAppointmentsDay);
router.get(
  "/confirmed/doctor/:doctorId/patient/:patientId",
  getConfirmedDoctorPatientAppointments
);

module.exports = router;