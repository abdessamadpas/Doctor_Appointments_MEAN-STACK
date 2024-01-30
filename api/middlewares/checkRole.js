const jwt = require("jsonwebtoken");

const checkRole = (roles) => {
  return (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    let role = "";
    if (!tokenHeader) {
      return res.status(401).json({ message: "need token " });
    }
    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const getPayload = jwt.verify(token, process.env.JWT_SECRET);
    const user = getPayload.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.isPatient ) {
      role = "patient";
    }
    if (user.isDoctor) {
      role = "doctor";
    }
    if (user.isAdmin ) {
      role = "admin";
    }

    console.log(roles, role);
    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied for this role" });
    }
  };
};

module.exports = { checkRole };
