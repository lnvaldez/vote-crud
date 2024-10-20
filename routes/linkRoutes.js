const express = require("express");
const controller = require("../controllers/linkController");

const router = express.Router();

router.post("/", controller.addLink);
router.put("/:link_id", controller.updateLink);
router.put("/vote/:link_id", controller.voteForLink);
router.delete("/:id", controller.deleteLink);

module.exports = router;
