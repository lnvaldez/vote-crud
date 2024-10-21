const express = require("express");
const controller = require("../controllers/linkController");

const router = express.Router();

router.post("/add", controller.addLink);
router.put("/:link_id", controller.updateLink);
router.post("/:link_id/vote", controller.voteForLink);
router.delete("/:id", controller.deleteLink);

module.exports = router;
