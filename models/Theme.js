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

exports.deleteTheme = async (id) => {
  const query = "DELETE FROM themes WHERE id = ?";

  try {
    await pool.execute(query, [id]);
    console.log("Theme deleted");
  } catch (error) {
    console.error("Failed to delete theme");
  }
};
