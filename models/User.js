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

    return true;
  } catch (error) {
    console.error("Failed to verify user");
  }
};
