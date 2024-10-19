const Theme = require("../models/Theme");

exports.createTheme = async (req, res) => {
  const { title, description, img_url, user_id } = req.body;

  try {
    await Theme.createTheme(title, description, img_url, user_id);
    res.status(201).json({ message: "Theme created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create theme" });
  }
};

exports.deleteTheme = async (req, res) => {
  const id = req.params.id;

  try {
    await Theme.deleteTheme(id);
    res.status(204).json({ message: "Theme deleted" });
  } catch (error) {}
};
