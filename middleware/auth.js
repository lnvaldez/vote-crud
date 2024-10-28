const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  const token = req.cookies.token;
  const sessionId = req.cookies.sessionId;

  const publicPaths = ["/users/login", "/users/register", "/themes/"];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (sessionId) {
    try {
      const result = await Session.getSession(sessionId);
      if (
        !result ||
        result.length === 0 ||
        (result[0].expires_at && new Date() > new Date(result[0].expires_at))
      ) {
        return res.redirect("/users/login");
      }
    } catch (error) {
      return res.redirect("/users/login");
    }
  }

  if (token) {
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
