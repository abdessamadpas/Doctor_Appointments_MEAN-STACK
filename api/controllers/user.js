const User = require("../app/auth/model");
const Patient = require("../app/patient/model");
const Doctor = require("../app/doctor/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/nodeMailer");

const login = async (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.json({
      message: "Please enter all fields",
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      message: "user not found🐱‍🏍",
    });
  }
  if (user.isSuspended) {
    return res.status(400).json({
      message: "Your Account is Suspended",
    });
  }
  if (user) {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "15d" },
        (err, token) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.json({
              user,
              token,
            });
          }
        }
      );
    } else {
      next({
        message: "Password Invalid Bro 👀👀👀",
      });
    }
  } else {
    next({
      message: "email Invalid try again 🐱‍👓 🐱‍🏍",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res
        .status(400)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save().then((user) => {
      if (user.isPatient) {
        const newPatient = new Patient({
          patient: user._id,
        });
        newPatient.save();
      } else if (user.isDoctor) {
        const newDoctor = new Doctor({
          doctor: user._id,
        });
        newDoctor.save();
      }
    });

    res
      .status(201)
      .send({ message: "Register Successfully", success: true, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
// const isLoggedIn = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   if (!token) {
//     res.status(403).json({
//       message: "Authentication failed, try to login",
//     });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err) => {
//       if (err) {
//         res.status(403).json({
//           message: "Authentication failed, try to login",
//         });
//       } else {
//         next();
//       }
//     });
//   }
// };

const getAllUsers = async (req, res) => {
  console.log(req.user);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting users");
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({
      message: "Please enter all fields",
    });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
};

const getMe = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "Authentication failed" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.isDoctor) {
      const doctor = await Doctor.findOne({ doctor: user._id }).populate(
        "doctor"
      );
      res.json(doctor);
    } else if (user.isPatient) {
      const patient = await Patient.findOne({ patient: user._id }).populate(
        "patient"
      );
      res.json(patient);
    } else if (user.isAdmin) {
      const admin = await User.findOne({ _id: user._id });

      res.json(admin);
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting user");
  }
};

const UpdateUser = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        res.status(403).json({
          message: "Authentication failed, try to login",
        });
      } else {
        if (!req.params.Id) {
          res.json({
            message: "Please enter all fields",
          });
        }
        const UpdatedUser = req.body;
        const UpdateUser = await User.findByIdAndUpdate(
          req.params.Id,
          UpdatedUser
        );
        if (!UpdateUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(UpdateUser);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update User",
    });
  }
};
const DeleteUser = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        res.status(403).json({
          message: "Authentication failed, try to login",
        });
      } else {
        if (!req.params.id) {
          res.json({
            message: "Please enter all fields",
          });
        }
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
          message: "🪓 User Deleted 🧨",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

const UpdateUserActivation = async (req, res) => {
  try {
    const { isSuspended } = req.body;
    console.log(isSuspended);
    const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
      isSuspended,
    });
    if (!UpdateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const EmailUser = UpdateUser.email;
    const statusUser = isSuspended ? "suspended" : "approve";
    // send email
    const mailOptions = {
      from: {
        name: "Doctor App",
        address: "boughadoin@gmail.com",
      }, // sender address
      to: [EmailUser], // list of receivers
      subject: "email from the doctor app", // Subject line
      text: "ur request to join the platform  ", // plain text body
      html: `<b>ur request to join the platform is  ${statusUser}</b>`, // html body
    };
    sendEmail(mailOptions);
    res.json(UpdateUser);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update User isSuspended ",
    });
  }
};

const requests = async (req, res) => {
  try {
    const users = await User.find({
      isSuspended: true,
    });
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(users);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
const getUsersInfo = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const patients = await Patient.find();
    const admins = await User.find({ isAdmin: true });

    const doctorsCount = doctors.length;
    const patientsCount = patients.length;
    const adminsCount = admins.length;

    return res.json({
      doctors: doctorsCount,
      patients: patientsCount,
      admins: adminsCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  login,
  signUp,
  getAllUsers,
  getMe,
  UpdateUser,
  DeleteUser,
  getUser,
  UpdateUserActivation,
  requests,
  getUsersInfo,
};
