const session = require("express-session");
const pool = require("../config/config");

exports.storeSession = async (sessionId, userId, expiresAt) => {
  const query =
    "INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)";

  try {
    await pool.query(query, [sessionId, userId, expiresAt]);
    console.log("Session stored");
  } catch (error) {
    console.error("Failed to store session");
  }
};

exports.getSession = async (sessionId) => {
  const query = "SELECT * FROM session WHERE session_id = ?";

  try {
    const [result] = await pool.query(query, [sessionId]);
    console.log("Session fetched");
    return result;
  } catch (error) {
    console.error("Failed to fetch session");
  }
};

exports.expireSession = async (sessionId) => {
  const query = "UPDATE sessions SET is_valid = false WHERE session_id = ?";

  try {
    await pool.query(query, [sessionId]);
    console.log("Session marked as invalid");
  } catch (error) {
    console.error("Failed to mark session as invalid");
  }
};

exports.deleteSession = async (sessionId) => {
  const query = "DELETE FROM sessions WHERE session_id = ?";

  try {
    await pool.query(query, [sessionId]);
    console.log("Session deleted");
  } catch (error) {
    console.error("Failed to delete session");
  }
};
