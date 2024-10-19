const Theme = require("../models/Theme");

exports.createTheme = async (req, res) => {
  const { title, description, img_url, user_id } = req.body;

  try {
    await Theme.createTheme(title, description, img_url, user_id);
    res.status(201).json({ message: "Theme created" });
  } catch (error) {}
};
