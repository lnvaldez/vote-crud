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

exports.getThemeLinks = async (theme_id) => {
  const query = "SELECT * FROM links WHERE theme_id = ?";

  try {
    const [result] = await pool.execute(query, [theme_id]);
    console.log("Fetched all theme links");
    return result;
  } catch (error) {
    console.error("Failed to fetch all theme links");
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

exports.deleteLink = async (id) => {
  const query = "DELETE FROM links WHERE id = ?";

  try {
    await pool.execute(query, [id]);
    console.log("Link deleted");
  } catch (error) {
    console.error("Failed to delete link: ", error);
  }
};
