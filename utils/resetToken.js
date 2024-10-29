const User = require("../models/User");
const crypto = require("crypto");

exports.createResetPasswordToken = async (email) => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expireDate = Date.now() + 10 * 60 * 1000;

  try {
    await User.storeResetData(email, hashedResetToken, expireDate);
    return resetToken;
  } catch (error) {
    console.error("Failed to store password reset data");
  }
};
