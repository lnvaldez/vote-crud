const pool = require("../config/config");
const bcrypt = require("bcrypt");

exports.createUser = async (username, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, hash) VALUES (?, ?, ?)";

    await pool.execute(query, [username, email, hash]);
    console.log("User created");
  } catch (error) {
    console.error("Failed to create user");
  }
};

exports.verifyUser = async (email, password) => {};
