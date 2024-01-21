const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.body.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied for this role" });
    }
  };
};

module.exports = { checkRole };
