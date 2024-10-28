const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  const sessionId = req.cookies.sessionId;
  if (sessionId && token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      res.locals.user = req.user;
    } catch (error) {
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};

exports.requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/users/login");
  }
};
