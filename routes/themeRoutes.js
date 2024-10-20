const express = require("express");
const controller = require("../controllers/themeController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, controller.getAllThemes);

router.get("/create", requireAuth, controller.renderCreateTheme);
router.post("/", requireAuth, controller.createTheme);

router.put("/:theme_id", controller.updateTheme);
router.post("/:theme_id/vote", controller.voteForTheme);
router.delete("/:id", controller.deleteTheme);

module.exports = router;
