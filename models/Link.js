const pool = require("../config/config");

exports.addLink = async (url, title, theme_id) => {
  const query = "INSERT INTO links (url, title, theme_id) VALUES (?, ?, ?)";

  try {
    await pool.execute(query, [url, title, theme_id]);
    console.log("Link added");
  } catch (error) {
    console.error("Failed to add link: ", error);
  }
};

exports.updateLink = async (url, title, link_id) => {
  const query = "UPDATE links SET url = ?, title = ? WHERE id = ?";

  try {
    await pool.execute(query, [url, title, link_id]);
    console.log("Link updated");
  } catch (error) {
    console.error("Failed to update link");
  }
};

exports.voteForLink = async (link_id) => {
  const query = "UPDATE links SET vote_count = vote_count + 1 WHERE id = ?";

  try {
    await pool.execute(query, [link_id]);
    console.log("Vote made");
  } catch (error) {
    console.error("Failed to make vote");
  }
};

exports.deleteLink = async (id) => {
  const query = "DELETE FROM links WHERE id = ?";

  try {
    await pool.execute(query, [id]);
    console.log("Link deleted");
  } catch (error) {
    console.error("Failed to delete link: ", error);
  }
};
