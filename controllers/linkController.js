const Link = require("../models/Link");

exports.addLink = async (req, res) => {
  const { url, title, theme_id } = req.body;

  try {
    await Link.addLink(url, title, theme_id);
    res.status(201).json({ message: "Link added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add link" });
  }
};
