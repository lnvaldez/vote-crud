const express = require("express");
const controller = require("../controllers/themeController");

const router = express.Router();

router.post("/", controller.createTheme);
router.get("/", controller.getAllThemes);
router.put("/:theme_id", controller.updateTheme);
router.post("/:theme_id/vote", controller.voteForTheme);
router.delete("/:id", controller.deleteTheme);

module.exports = router;
