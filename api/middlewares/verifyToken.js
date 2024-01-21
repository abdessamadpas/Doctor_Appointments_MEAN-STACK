// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
const jwt = require("jsonwebtoken");
const User = require("../app/auth/model");
const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(401).json({ message: "need token " });
  }
  const token = tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden,Authentication failed, try to login" });
    }
    // Attach the authenticated user to the request object
    req.user = authData.user;

    next();
  });
};

module.exports = verifyToken;
