const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

const auth = require("../app/middlewares/AuthMiddleware");
const mentor = require("../app/middlewares/MentorMiddleware");

router.get("/", courseController.index);
router.post("/", auth, courseController.store);
router.get("/:id", courseController.show);
router.patch("/:id", auth, mentor, courseController.update);

module.exports = router;
