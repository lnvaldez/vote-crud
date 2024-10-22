const Theme = require("../models/Theme");
const Link = require("../models/Link");
const User = require("../models/User");

exports.renderCreateTheme = async (req, res) => {
  res.render("pages/theme-create");
};

exports.renderEditPage = async (req, res) => {
  const theme_id = req.params.id;

  try {
    const theme = await Theme.getThemeById(theme_id);
    const links = await Theme.getLinks(theme_id);
    res.render("pages/theme-edit", {
      id: theme_id,
      theme: theme,
      links: links,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to render edit page" });
  }
};

exports.createTheme = async (req, res) => {
  const { title, description, img_url, user_id } = req.body;

  try {
    await Theme.createTheme(title, description, img_url, user_id);
    const id = await Theme.getTheme(title, user_id);
    res.redirect(`/themes/edit/${id}`);
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

exports.getUserThemes = async (req, res) => {
  try {
    const themes = await Theme.getUserThemes(req.user.id);
    res.render("pages/my-themes", { themes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch themes" });
  }
};

exports.getTheme = async (req, res) => {
  const id = req.params.id;
  try {
    const links = await Theme.getLinks(id);
    const theme = await Theme.getThemeById(id);
    const user = await User.getUserByThemeUserId(id);
    res.render("pages/theme-view", { theme, links, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

exports.updateTheme = async (req, res) => {
  const theme_id = req.params.id;
  const { title, description, img_url } = req.body;

  try {
    await Theme.updateTheme(title, description, img_url, theme_id);
    res.redirect("/themes/my-themes");
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
    await Link.clearLinks(id);
    await Theme.deleteTheme(id);
    res.redirect("/themes/my-themes");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete theme" });
  }
};
