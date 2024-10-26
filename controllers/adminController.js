const Theme = require("../models/Theme");

exports.renderAdminPage = async (req, res) => {
  const themes = res.render("/pages/admin-panel");
};
