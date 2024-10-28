const User = require("../models/User");
const Theme = require("../models/Theme");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config();

exports.renderRegisterPage = (req, res) => {
  res.render("pages/register");
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
  res.render("pages/login");
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const userId = await User.verifyUser(email, password);

    if (!userId) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const sessionId = 1; // crypto

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "1h",
    });

    if (rememberMe) {
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } else {
      res.cookie("sessionId", sessionId, { httpOnly: true });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : null,
    });

    res.redirect("/themes");
    // return res.status(200).json({ message: "User verified" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

exports.logout = (req, res) => {
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
