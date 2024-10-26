const pool = require("../config/config");

exports.createTheme = async (title, description, img_url, user_id) => {
  const query =
    "INSERT INTO themes (title, description, img_url, user_id) VALUES (?, ?, ?, ?)";

  try {
    await pool.execute(query, [title, description, img_url, user_id]);
    console.log("Theme created");
  } catch (error) {
    console.error("Failed to create theme: ", error);
  }
};

exports.getApprovedThemes = async () => {
  const query =
    "SELECT * FROM themes WHERE status = ? ORDER BY vote_count DESC ";
  const status = "approved";

  try {
    const [result] = await pool.execute(query, [status]);
    console.log("Fetched all themes");
    return result;
  } catch (error) {
    console.error("Failed to fetch all themes: ", error);
  }
};

exports.getPendingThemes = async () => {
  const query =
    "SELECT * FROM themes WHERE status = ? ORDER BY created_at DESC";
  const status = "pending";

  try {
    const [result] = await pool.execute(query, [status]);
    console.log("Fetched all pending themes");
    return result;
  } catch (error) {
    console.error("Failed to fetch all pending themes: ", error);
  }
};

exports.getUserThemes = async (user_id) => {
  const query =
    "SELECT * FROM themes WHERE user_id = ? ORDER BY vote_count DESC";

  try {
    const [result] = await pool.execute(query, [user_id]);
    console.log("Fetched theme");
    return result;
  } catch (error) {
    console.error("Failed to fetch themes: ", error);
  }
};

exports.getTheme = async (title, user_id) => {
  const query = "SELECT * FROM themes WHERE title = ? AND user_id = ?";

  try {
    const [result] = await pool.execute(query, [title, user_id]);
    console.log("Fetched ID");
    return result[0].id;
  } catch (error) {
    console.error("Failed to fetch ID: ", error);
  }
};

exports.getThemeById = async (id) => {
  const query = "SELECT * FROM themes WHERE id = ?";

  try {
    const [result] = await pool.execute(query, [id]);
    console.log("Fetched theme by ID");
    return result[0];
  } catch (error) {
    console.error("Failed to fetch theme by ID: ", error);
  }
};

exports.getLinks = async (theme_id) => {
  const query = "SELECT * FROM links WHERE theme_id = ?";

  try {
    const [result] = await pool.execute(query, [theme_id]);
    console.log("Fetched all theme links");
    return result;
  } catch (error) {
    console.error("Failed to fetch all theme links: ", error);
  }
};

exports.updateTheme = async (title, description, img_url, theme_id) => {
  const query =
    "UPDATE themes SET title = ?, description = ?, img_url = ? WHERE id = ?";

  try {
    await pool.execute(query, [title, description, img_url, theme_id]);
    console.log("Theme updated");
  } catch (error) {
    console.error("Failed to update theme: ", error);
  }
};

exports.voteForTheme = async (theme_id) => {
  const query = "UPDATE themes SET vote_count = vote_count + 1 WHERE id = ?";

  try {
    await pool.execute(query, [theme_id]);
    console.log("Vote made");
  } catch (error) {
    console.error("Failed to make vote: ", error);
  }
};

exports.deleteTheme = async (id) => {
  const query = "DELETE FROM themes WHERE id = ?";

  try {
    await pool.execute(query, [id]);
    console.log("Theme deleted");
  } catch (error) {
    console.error("Failed to delete theme: ", error);
  }
};

exports.deleteUserThemes = async (id) => {
  const query = "DELETE FROM themes WHERE user_id = ?";
  try {
    await pool.execute(query, [id]);
    console.log("User themetes deleted");
  } catch (error) {
    console.error("Failed to delete user themes: ", error);
  }
};
