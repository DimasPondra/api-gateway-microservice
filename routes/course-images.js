const express = require("express");
const router = express.Router();

const courseImageController = require("../app/controllers/CourseImageController");

const auth = require("../app/middlewares/AuthMiddleware");
const mentor = require("../app/middlewares/MentorMiddleware");

router.post("/", auth, mentor, courseImageController.store);
router.delete("/:id", auth, mentor, courseImageController.delete);

module.exports = router;
