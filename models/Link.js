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

exports.getAllLinks = async () => {
  const query = "SELECT * FROM links";

  try {
    const [result] = await pool.execute(query);
    console.log("Fetched all links");
    return result;
  } catch (error) {
    console.error("Failed to fetch all links");
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
