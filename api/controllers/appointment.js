const Appointment = require("../app/appointment/model");
const User = require("../app/auth/model");
const Doctor = require("../app/doctor/model");
const { sendEmail } = require("../services/nodeMailer");
const dailyAppointmentsBooked = async (req, res) => {
  try {
    const { date } = req.body;
    currentDate = new Date(date);
    const { id } = req.params;
    if (id === undefined) {
      res.status(500).json({
        message: "id doctor undefined",
      });
    }
    const doctor = await User.findById(id);
    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }
    // calculate the appointments number per the selected day
    const dailyAppointmentsBooked = await Appointment.countDocuments({
      doctor: id,
      date: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59
        ),
      },
    });

    // extract the appointments

    // Extract the appointments for the selected day
    const appointments = await Appointment.find({
      doctor: id,
      date: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59
        ),
      },
    });

    // Extract the timePicked attribute from appointments
    const timePickedArray = appointments.map(
      (appointment) => appointment.timePicked
    );

    res.json({ dailyAppointmentsBooked, timePickedArray });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting daily appointments booked");
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, timePicked, phone, email, city } =
      req.body;
    if (!patientId || !doctorId || !date) {
      return res.status(400).send("Missing required fields");
    }

    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);
    if (!patient || !doctor) {
      return res.status(400).send("Patient or doctor does not exist");
    }
    const selectedDay = new Date(date);
    // check if it is a future date
    const currentDate = new Date();
    selectedDay.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    console.log(selectedDay, currentDate);
    if (selectedDay < currentDate) {
      return res.json({
        available: false,
        message: "Selected date must be in the future",
      });
    }
    // check if doctor is busy
    const dayOfWeek = selectedDay.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.json({
        available: false,
        message: "Doctor does not work on weekends",
      });
    }

    // check if  full day is booked
    const dailyAppointmentsBooked = await Appointment.countDocuments({
      doctor: doctorId,
      date: {
        $gte: new Date(
          selectedDay.getFullYear(),
          selectedDay.getMonth(),
          selectedDay.getDate(),
          0,
          0,
          0
        ),
        $lt: new Date(
          selectedDay.getFullYear(),
          selectedDay.getMonth(),
          selectedDay.getDate(),
          23,
          59,
          59
        ),
      },
    });

    console.log("dailyAppointmentsBooked", dailyAppointmentsBooked);
    if (dailyAppointmentsBooked > 10) {
      return res.json({
        available: false,
        message: "Doctor has reached the daily appointment limit",
      });
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date: new Date(date),
      phone: phone,
      city: city,
      email: email,
      timePicked: timePicked,
    });
// send email
const mailOptions = {
  from: {
    name: "Doctor App",
    address: "boughadoin@gmail.com",
  }, // sender address
  to: [email], // list of receivers
  subject: "email from the doctor app", // Subject line
  text: "about ur request to book an appointment   ", // plain text body
  html: `<b>ur request to  book an appointment with doctor  ${doctor.username} ${date}  ${timePicked} in review </b>`, // html body
};
sendEmail(mailOptions);
    res.json(newAppointment, dailyAppointmentsBooked, {
      message: "Appointment booked successfully",
    });
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

    const appointments = await Appointment.find({ patient: id })
      .populate("doctor")
      .populate("patient")
      .exec();

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting patient appointments");
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.find({ doctor: id }).populate("doctor").exec();
    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }

    const appointments = await Appointment.find({ doctor: id })
      .populate("doctor")
      .populate("patient")
      .exec();
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
const changeStatusAppointment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Missing required field status");
  }
  try {
    console.log(id);
    const appointment = await Appointment.findById(id);
    console.log(appointment);
    if (!appointment) {
      return res.status(400).send("Appointment does not exist");
    }
   const userUpdated=  await Appointment.findByIdAndUpdate(id, {
      status: status,
    });

    //! Send email to patient
    const patientEmail =appointment.email
// send email
const mailOptions = {
  from: {
    name: "Doctor App",
    address: "boughadoin@gmail.com",
  }, // sender address
  to: [patientEmail], // list of receivers
  subject: "email from the doctor app", // Subject line
  text: "about ur appointment  ", // plain text body
  html: `<b>ur request to get appointment in   ${appointment.date} at ${appointment.timePicked} changed to ${userUpdated.status}  </b>`, // html body
};
sendEmail(mailOptions);

    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating appointment");
  }
};

const getConfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "confirm" });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};
const getConfirmedAppointmentsDay = async (req, res) => {
  try {
    const id = req.params.id;
    const { date } = req.body;
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
    console.log("wewe",startOfDay, new Date() , endOfDay);
    const appointments = await Appointment.find({
      doctor: id,
      status: "confirm",
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("patient").exec();

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};

const getNextAppoitments = async (req, res) => {
  try {
    const { id } = req.params;
    
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const appointments = await Appointment.find({
      doctor: id,
      date: { $gte: startOfDay },

    }).populate("patient").exec();

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting appointments");
  }
};


const getUnconfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "decline" });
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
      status: "confirm",
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
      status: "pending" || "decline",
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
      status: "confirm",
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
      status: "pending" || "decline",
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
      status: "confirm",
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
  dailyAppointmentsBooked,
  getDoctorAppointments,
  getNextAppoitments,
  updateAppointment,
  changeStatusAppointment,
  getConfirmedAppointments,
  getUnconfirmedAppointments,
  getConfirmedPatientAppointments,
  getUnconfirmedPatientAppointments,
  getConfirmedDoctorAppointments,
  getUnconfirmedDoctorAppointments,
  getConfirmedDoctorPatientAppointments,
  getConfirmedAppointmentsDay,
};
