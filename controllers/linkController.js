const Link = require("../models/Link");

exports.addLink = async (req, res) => {
  const { url, title, theme_id } = req.body;
  const backUrl = req.header("Referer");

  try {
    await Link.addLink(url, title, theme_id);
    res.redirect(backUrl);
  } catch (error) {
    res.status(500).json({ error: "Failed to add link" });
  }
};

exports.updateLink = async (req, res) => {
  const link_id = req.params.link_id;
  const { url, title } = req.body;
  const backUrl = req.header("Referer");

  try {
    await Link.updateLink(url, title, link_id);
    res.redirect(backUrl);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update link" });
  }
};

exports.voteForLink = async (req, res) => {
  const link_id = req.params.link_id;
  const backUrl = req.header("Referer");

  try {
    await Link.voteForLink(link_id);
    res.redirect(backUrl);
  } catch (error) {
    return res.status(500).json({ error: "Failed to make vote" });
  }
};

exports.deleteLink = async (req, res) => {
  const id = req.params.id;
  const backUrl = req.header("Referer");

  try {
    await Link.deleteLink(id);
    res.redirect(backUrl);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete link" });
  }
};
