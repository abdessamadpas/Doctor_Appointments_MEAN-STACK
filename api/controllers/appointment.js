const Appointment = require("../app/appointment/model");
const User = require("../app/auth/model");

const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;
    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(400).send("Patient or doctor does not exist");
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date: new Date(date),
    });

    res.json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error booking appointment");
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params.id;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(400).send("Appointment does not exist");
    }

    await Appointment.findByIdAndDelete(appointmentId);

    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting appointment");
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await User.findById(id);
    if (!patient) {
      return res.status(400).send("Patient does not exist");
    }

    const appointments = await Appointment.find({ patient: id });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting patient appointments");
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findById(id);
    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }

    const appointments = await Appointment.find({ doctor: id });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctor appointments");
  }
};

//put
const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params.id;
    const { patientId, doctorId, date, isConfirmed } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(400).send("Appointment does not exist");
    }

    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(400).send("Patient or doctor does not exist");
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      patient: patientId,
      doctor: doctorId,
      date: new Date(date),
      isConfirmed: isConfirmed,
    });

    res.json({ message: "Appointment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating appointment");
  }
};

//patch
const confirmAppointment = async (req, res) => {
  const { appointmentId } = req.params.id;
  const { isConfirmed } = req.body;

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(400).send("Appointment does not exist");
  }
  await Appointment.findByIdAndUpdate(appointmentId, {
    isConfirmed: isConfirmed,
  });
};

const getConfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ isConfirmed: true });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};

const getUnconfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ isConfirmed: false });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};

const getConfirmedPatientAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await User.findById(id);
    if (!patient) {
      return res.status(400).send("Patient does not exist");
    }

    const appointments = await Appointment.find({
      patient: id,
      isConfirmed: true,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting patient appointments");
  }
};
const getUnconfirmedPatientAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await User.findById(id);
    if (!patient) {
      return res.status(400).send("Patient does not exist");
    }

    const appointments = await Appointment.find({
      patient: id,
      isConfirmed: false,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting patient appointments");
  }
};

const getConfirmedDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findById(id);
    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }

    const appointments = await Appointment.find({
      doctor: id,
      isConfirmed: true,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctor appointments");
  }
};

const getUnconfirmedDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findById(id);
    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }

    const appointments = await Appointment.find({
      doctor: id,
      isConfirmed: false,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctor appointments");
  }
};

const getConfirmedDoctorPatientAppointments = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);
    if (!doctor || !patient) {
      return res.status(400).send("Doctor or patient does not exist");
    }

    const appointments = await Appointment.find({
      doctor: doctorId,
      patient: patientId,
      isConfirmed: true,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctor appointments");
  }
};

module.exports = {
  bookAppointment,
  deleteAppointment,
  getAllAppointments,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointment,
  confirmAppointment,
  getConfirmedAppointments,
  getUnconfirmedAppointments,
  getConfirmedPatientAppointments,
  getUnconfirmedPatientAppointments,
  getConfirmedDoctorAppointments,
  getUnconfirmedDoctorAppointments,
  getConfirmedDoctorPatientAppointments,
};
