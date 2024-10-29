const express = require("express");
const rateLimit = require("express-rate-limit");
const controller = require("../controllers/userController");

const router = express.Router();

router.get("/register", controller.renderRegisterPage);
router.post("/register", controller.register);

router.get("/login", controller.renderLoginPage);
router.post(
  "/login",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    headers: false,
    max: 10,
    message: "Failed to login too many times",
  }),
  controller.login
);

router.get("/forgot", controller.renderForgotPage);
router.post("/forgot", controller.forgotPassword);

router.get("/reset/:token", controller.renderResetPage);
router.post("/reset/:token", controller.resetPassword);

router.get("/logout", controller.logout);

router.post("/delete/:id", controller.deleteUser);

module.exports = router;
