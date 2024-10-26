const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.get("/register", controller.renderRegisterPage);
router.post("/register", controller.register);

router.get("/login", controller.renderLoginPage);
router.post("/login", controller.login);

router.get("/logout", controller.logout);

router.post("/delete/:id", controller.deleteUser);

module.exports = router;
