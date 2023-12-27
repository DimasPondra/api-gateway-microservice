const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

const auth = require("../app/middlewares/AuthMiddleware");

router.get("/", courseController.index);
router.post("/", auth, courseController.store);
router.get("/:id", courseController.show);
router.patch("/:id", auth, courseController.update);

module.exports = router;
