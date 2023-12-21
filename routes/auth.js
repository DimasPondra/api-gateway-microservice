const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");

const auth = require("../app/middlewares/AuthMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);

module.exports = router;
