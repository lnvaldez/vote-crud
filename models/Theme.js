const pool = require("../config/config");

exports.createTheme = async (title, description, img_url, user_id) => {
  const query =
    "INSERT INTO themes (title, description, img_url, user_id) VALUES (?, ?, ?, ?)";

  try {
    await pool.execute(query, [title, description, img_url, user_id]);
    console.log("Theme created");
  } catch (error) {
    console.error("Failed to create theme");
  }
};

exports.getAllThemes = async () => {
  const query = "SELECT * FROM themes";

  try {
    const [result] = await pool.execute(query);
    console.log("Fetched all themes");
    return result;
  } catch (error) {
    console.error("Failed to fetch all themes");
  }
};

exports.updateTheme = async (title, description, img_url, theme_id) => {
  const query =
    "UPDATE themes SET title = ?, description = ?, img_url = ? WHERE id = ?";

  try {
    await pool.execute(query, [title, description, img_url, theme_id]);
    console.log("Theme updated");
  } catch (error) {
    console.error("Failed to update theme");
  }
};

exports.voteForTheme = async (theme_id) => {
  const query = "UPDATE themes SET vote_count = vote_count + 1 WHERE id = ?";

  try {
    await pool.execute(query, [theme_id]);
    console.log("Vote made");
  } catch (error) {
    console.error("Failed to make vote");
  }
};

exports.deleteTheme = async (id) => {
  const query = "DELETE FROM themes WHERE id = ?";

  try {
    await pool.execute(query, [id]);
    console.log("Theme deleted");
  } catch (error) {
    console.error("Failed to delete theme");
  }
};
