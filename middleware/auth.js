const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
