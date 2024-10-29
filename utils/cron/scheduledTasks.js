const cron = require("node-cron");
const Session = require("../../models/Session");

cron.schedule("*/10 * * * *", async () => {
  const now = new Date();

  try {
    await Session.deleteNullSessions(now);
    console.log("Expired sessions cleaned up at: ", now);
  } catch (error) {
    console.error("Failed to clean up expired sessions:", error);
  }
});

module.exports = cron;
