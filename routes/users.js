const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

const auth = require("../app/middlewares/AuthMiddleware");
const admin = require("../app/middlewares/AdminMiddleware");

router.get("/", auth, admin, userController.index);
router.get("/profile", auth, userController.show);
router.patch("/profile", auth, userController.update);

module.exports = router;
