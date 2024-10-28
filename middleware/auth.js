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

  if (!sessionId) {
    return res.redirect("/users/login");
  }

  const result = await Session.getSession(sessionId);
  console.log(result);

  if (
    !result ||
    result.length === 0 ||
    (result.expires_at && new Date() > result.expires_at)
  ) {
    return res.redirect("/users/login");
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
