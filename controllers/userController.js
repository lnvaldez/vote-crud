const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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
  const { email, password } = req.body;

  try {
    const userId = await User.verifyUser(email, password);

    if (!userId) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};
