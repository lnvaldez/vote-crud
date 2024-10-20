const Theme = require("../models/Theme");

exports.renderCreateTheme = async (req, res) => {
  res.render("pages/theme-create");
};

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
    const themes = await Theme.getAllThemes();
    res.render("pages/themes", { themes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all themes" });
  }
};

exports.updateTheme = async (req, res) => {
  const theme_id = req.params.theme_id;
  const { title, description, img_url } = req.body;

  try {
    await Theme.updateTheme(title, description, img_url, theme_id);
    res.status(200).json({ message: "Theme updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update theme" });
  }
};

exports.voteForTheme = async (req, res) => {
  const theme_id = req.params.theme_id;

  try {
    await Theme.voteForTheme(theme_id);
    res.redirect("/themes");
  } catch (error) {
    res.status(500).json({ error: "Failed to make vote" });
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
