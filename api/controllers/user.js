const User = require("../app/auth/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.json({
      message: "Please enter all fields",
    });
  }
  const user = await User.findOne({ email: req.body.email });
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
      message: "Username Invalid try again 🐱‍👓 🐱‍🏍",
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
    await newUser.save();
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
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user._id;
    const user = await User.findById(userId);
    res.json(user);
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

module.exports = {
  login,
  signUp,
  getAllUsers,
  getMe,
  UpdateUser,
  DeleteUser,
  getUser,
};
