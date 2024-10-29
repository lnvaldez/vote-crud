const User = require("../models/User");
const Theme = require("../models/Theme");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

exports.renderRegisterPage = (req, res) => {
  res.render("pages/register", { csrfToken: req.csrfToken() });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await User.createUser(username, email, password);
    res.redirect("login");
    // res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.renderLoginPage = (req, res) => {
  res.render("pages/login", { csrfToken: req.csrfToken() });
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const userId = await User.verifyUser(email, password);

    if (!userId) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const sessionId = crypto.randomUUID();
    const expiresAt = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Remember Me is checked
      : null;
    await Session.storeSession(sessionId, userId, expiresAt);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "1h",
    });

    if (rememberMe) {
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      });
    } else {
      res.cookie("sessionId", sessionId, { httpOnly: true, secure: true });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : null,
    });

    res.redirect("/themes");
    // return res.status(200).json({ message: "User verified" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

exports.logout = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  await Session.expireSession(sessionId);
  await Session.deleteSession(sessionId);

  res.clearCookie("sessionId");
  res.clearCookie("token");
  res.redirect("/themes");
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Theme.deleteUserThemes(id);
    await User.deleteUser(id);
    res.redirect("/admin/users");
  } catch (error) {}
};

exports.renderForgotPage = async (req, res) => {
  res.render("pages/forgot-password", { csrfToken: req.csrfToken() });
};

exports.forgotPassword = async (req, res, next) => {
  const user = User.getUserByEmail(req.body.email);

  if (!user) {
    return res.status(404).send("Can't find requested resource");
  }

  const resetToken = crypto.randomBytes(32, toString("hex"));

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expireDate = Date.now() + 10 * 60 * 1000;

  try {
    await User.storeResetData(hashedResetToken, expireDate);
    return resetToken;
  } catch (error) {}
};

exports.resetPassword = async (req, res, next) => {};
