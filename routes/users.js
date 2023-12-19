const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

const auth = require("../app/middlewares/AuthMiddleware");

router.get("/", auth, userController.index);
router.get("/profile", auth, userController.show);
router.patch("/profile", auth, userController.update);

module.exports = router;
