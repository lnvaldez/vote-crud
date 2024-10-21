const express = require("express");
const controller = require("../controllers/themeController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", controller.getAllThemes);
router.get("/view/:id", controller.getTheme);

// Protected routes
router.get("/create", requireAuth, controller.renderCreateTheme);
router.post("/create", requireAuth, controller.createTheme);

router.get("/my-themes", requireAuth, controller.getUserThemes);
router.get("/edit/:id", requireAuth, controller.renderEditPage);
// router.post("/edit/:id", requireAuth, controller.updateTheme);
router.post("/delete/:id", requireAuth, controller.deleteTheme);

router.post("/:theme_id/vote", requireAuth, controller.voteForTheme);

module.exports = router;
