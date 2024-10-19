const express = require("express");
const controller = require("../controllers/themeController");

const router = express.Router();

router.post("/", controller.createTheme);
router.delete("/:id", controller.deleteTheme);

module.exports = router;
