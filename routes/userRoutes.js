const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.get("/register", controller.renderRegisterPage);
router.post("/register", controller.register);

router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
