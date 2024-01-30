const User = require("../app/auth/model");
const Patient = require("../app/patient/model");

const getPatient = async (req, res) => {
    try {
        const { id } = req.params;
    
      
        const patient = await Patient.findOne({ patient: id }).populate("patient");
        if (!patient ) {
        return res.status(400).send("Patient does not exist");
        }
    
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting patient");
    }
    }

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("patient");
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting patients");
    }
}


const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
    
        const patient = await User.findById(id);
        if (!patient) {
        return res.status(400).send("Patient does not exist");
        }
    
        patient.name = name;
        patient.email = email;
        patient.password = password;
        patient.role = role;
    
        await patient.save();
    
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating patient");
    }
    }
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
    
        const patient = await User.findById(id);
        if (!patient) {
        return res.status(400).send("Patient does not exist");
        }
    
        await patient.delete();
    
        res.json({ message: "Patient deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting patient");
    }
    }
module.exports = {
    getPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
};