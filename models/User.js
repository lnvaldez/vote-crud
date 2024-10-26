const pool = require("../config/config");
const bcrypt = require("bcrypt");

exports.createUser = async (username, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, hash) VALUES (?, ?, ?)";

    await pool.execute(query, [username, email, hash]);
    console.log("User created");
  } catch (error) {
    console.error("Failed to create user: ", error);
  }
};

exports.verifyUser = async (email, password) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await pool.execute(query, [email]);

    const user = result[0];

    if (!user) {
      console.log("User not found");
      return false;
    }

    const valid = await bcrypt.compare(password, user.hash);

    if (!valid) {
      console.log("Invalid password");
      return false;
    }

    console.log("User verified");

    return user.id;
  } catch (error) {
    console.error("Failed to verify user: ", error);
  }
};

exports.getAllUsers = async () => {
  try {
    const role = "user";
    const query = "SELECT * FROM users WHERE role = ?";
    const [result] = await pool.execute(query, [role]);

    console.log("Fetched all users");

    return result;
  } catch (error) {
    console.error("Failed to get all users: ", error);
  }
};

exports.getUserByThemeUserId = async (id) => {
  try {
    const getUserId = "SELECT user_id FROM themes WHERE id = ?";
    const [user_id] = await pool.execute(getUserId, [id]);

    const getUser = "SELECT * FROM users WHERE id = ?";
    const [result] = await pool.execute(getUser, [user_id[0].user_id]);

    return result[0];
  } catch (error) {
    console.error("Failed to find user by ID: ", error);
  }
};

exports.getRole = async (id) => {
  try {
    const query = "SELECT role FROM users WHERE id = ?";
    const [role] = await pool.execute(query, [id]);

    return role[0];
  } catch (error) {
    console.error("Failed to find user by ID: ", error);
  }
};
