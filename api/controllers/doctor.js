const User = require("../app/auth/model");
const Doctor = require("../app/doctor/model");
const Patient = require("../app/patient/model");

const getAllDoctors = async (req, res) => {
  console.log("hello");
  try {
    const doctor = await Doctor.find().populate("doctor");

    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }

    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctors");
  }
};

const getDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.find({ doctor: id }).populate("doctor");

    if (!doctor) {
      return res.status(400).send("Doctor does not exist");
    }
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting doctors");
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const doctor = await User.findById(id);
  if (!doctor) {
    return res.status(400).send("Doctor does not exist");
  }
  doctor.name = name;
  doctor.email = email;
  doctor.password = password;

  await doctor.save();

  res.json(doctor);
};
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const doctor = await Doctor.findOne({ doctor: id });
  if (!user || !doctor) {
    return res.status(400).send("Doctor does not exist");
  }
  await user.remove();
  await doctor.remove();
  res.json({ message: "Doctor deleted successfully" });
};
const getPatientsDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findOne({ doctor: id }).populate("doctor");
  if (!doctor) {
    return res.status(400).send("Doctor does not exist");
  }
  res.json(doctor);
};
const getSuspendedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("doctor");
    if (!doctors) {
      return res.status(400).send("Doctor does not exist");
    }
    const suspendedDoctors = doctors.filter(
      (doctor) => doctor.doctor.isSuspended === true
    );
    console.log(suspendedDoctors);

    res.json(suspendedDoctors);
  } catch (error) {
    res.json({
      message: "error fetch doctors",
      error: error.message,
    });
  }
};
module.exports = {
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getPatientsDoctor,
  getSuspendedDoctors,
};
