const express = require("express");
const controller = require("../controllers/linkController");

const router = express.Router();

router.post("/", controller.addLink);
router.get("/:theme_id", controller.getThemeLinks);
router.put("/", controller.updateLink);
router.delete("/:id", controller.deleteLink);

module.exports = router;
