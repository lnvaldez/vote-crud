const User = require("../models/User");
const Theme = require("../models/Theme");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const { createResetPasswordToken } = require("../utils/resetToken");

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
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: null,
      });
    }

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

  const resetToken = await createResetPasswordToken(req.body.email);

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/users/reset/${resetToken}`;

  console.log(resetUrl);

  const message = `Your password reset link is ready. Use the link below to reset your password\n\n${resetUrl}\n\nLink valid for 10 minutes`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Reset password",
      message: message,
    });
    res.status(200).send("Check your email");
  } catch (error) {
    await User.storeResetData(req.body.email, null, null);
    return res.status(500).json("Failed to send reset password email: ", error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.getUserByToken(token);
  const newPassword = req.body.password;

  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log(user.resetTokenExpires);

  if (user.resetTokenExpires < Date.now()) {
    return res.status(410).send("The reset token is no longer valid");
  }

  try {
    await User.resetPassword(newPassword, token);
    await User.storeResetData(user.email, null, null);
  } catch (error) {
    return res.status(500).send("Failed to reset password: ", error);
  }
};
