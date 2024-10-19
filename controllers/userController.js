const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await User.createUser(username, email, password);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.verifyUser = async (req, res) => {};
