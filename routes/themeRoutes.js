const express = require("express");
const controller = require("../controllers/themeController");

const router = express.Router();

router.post("/", controller.createTheme);
router.get("/", controller.getAllThemes);
router.put("/", controller.updateTheme);
router.put("/:theme_id", controller.voteForTheme);
router.delete("/:id", controller.deleteTheme);

module.exports = router;
