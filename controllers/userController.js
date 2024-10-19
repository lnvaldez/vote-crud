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

exports.verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.verifyUser(email, password);

    if (!result) {
      return res.status(401).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify user" });
  }
};
