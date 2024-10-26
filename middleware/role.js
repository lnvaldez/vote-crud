const User = require("../models/User");

exports.authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).send("Access denied");
  }
  next();
};

exports.checkRole = async (req, res, next) => {
  if (req.user && req.user.id) {
    const result = await User.getRole(req.user.id);
    req.user.role = result.role;
  }
  next();
};
