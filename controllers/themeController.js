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

exports.getAllThemes = async (req, res) => {
  try {
    const result = await Theme.getAllThemes();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all themes" });
  }
};

exports.deleteTheme = async (req, res) => {
  const id = req.params.id;

  try {
    await Theme.deleteTheme(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete theme" });
  }
};
