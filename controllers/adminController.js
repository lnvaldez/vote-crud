const Theme = require("../models/Theme");

exports.renderAdminPage = async (req, res) => {
  try {
    const themes = await Theme.getPendingThemes();
    res.render("pages/admin-panel", { themes });
  } catch (error) {
    res.status(500).json({ error: "Failed to render admin panel" });
  }
};
