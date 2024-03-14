const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");

const auth = require("../app/middlewares/AuthMiddleware");

router.post("/", auth, orderController.joinCourse);

module.exports = router;
