const Theme = require("../models/Theme");
const User = require("../models/User");

exports.renderAdminThemePage = async (req, res) => {
  try {
    const themes = await Theme.getPendingThemes();
    res.render("pages/admin-themes", { themes, csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).json({ error: "Failed to render admin theme page" });
  }
};

exports.renderAdminUserPage = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.render("pages/admin-users", { users, csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).json({ error: "Failed to render admin user page" });
  }
};

exports.approveTheme = async (req, res) => {
  const backUrl = req.header("Referer");
  const id = req.params.id;
  try {
    await Theme.approveTheme(id);
    res.redirect(backUrl);
  } catch (error) {
    res.status(500).json({ error: "Failed to approve theme" });
  }
};
