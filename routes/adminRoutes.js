const express = require("express");
const controller = require("../controllers/adminController");
const { requireAuth } = require("../middleware/auth");
const { authorizeRole } = require("../middleware/role");

const router = express.Router();

router.get("/panel", authorizeRole, controller.renderAdminPage);

module.exports = router;
