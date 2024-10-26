const express = require("express");
const controller = require("../controllers/adminController");
const { requireAuth } = require("../middleware/auth");
const { authorizeRole } = require("../middleware/role");

const router = express.Router();

router.get(
  "/themes",
  requireAuth,
  authorizeRole("admin"),
  controller.renderAdminThemePage
);

router.get(
  "/users",
  requireAuth,
  authorizeRole("admin"),
  controller.renderAdminUserPage
);

router.post(
  "/approve/:id",
  requireAuth,
  authorizeRole("admin"),
  controller.approveTheme
);

module.exports = router;
