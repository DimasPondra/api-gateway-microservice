const express = require("express");
const router = express.Router();

const myCourseController = require("../app/controllers/MyCourseController");

const auth = require("../app/middlewares/AuthMiddleware");

router.get("/", auth, myCourseController.index);
router.post("/", auth, myCourseController.store);

module.exports = router;
