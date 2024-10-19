const Link = require("../models/Link");
const { link } = require("../routes/themeRoutes");

exports.addLink = async (req, res) => {
  const { url, title, theme_id } = req.body;

  try {
    await Link.addLink(url, title, theme_id);
    res.status(201).json({ message: "Link added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add link" });
  }
};

exports.getThemeLinks = async (req, res) => {
  const theme_id = req.params.theme_id;

  try {
    const result = await Link.getThemeLinks(theme_id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch all theme links" });
  }
};

exports.updateLink = async (req, res) => {
  const { url, title, link_id } = req.body;

  try {
    await Link.updateLink(url, title, link_id);
    return res.status(200).json({ message: "Link updated" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update link" });
  }
};

exports.voteForLink = async (req, res) => {
  const link_id = req.params.id;

  try {
    await Link.voteForLink(link_id);
    return res.status(200).json({ message: "Vote made" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to make vote" });
  }
};

exports.deleteLink = async (req, res) => {
  const id = req.params.id;

  try {
    await Link.deleteLink(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete link" });
  }
};
