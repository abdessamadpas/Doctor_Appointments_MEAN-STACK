const express = require("express");
const {
  login,
  signUp,
  getAllUsers,
  getMe,
  UpdateUser,
  DeleteUser,
  getUser,
} = require("../../controllers/user");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/all", verifyToken ,getAllUsers);
router.get("/me", getMe);
router.get("/get/:id", getUser);
router.put("/update/:id", UpdateUser);
router.delete("/delete/:id", DeleteUser);

module.exports = router;
