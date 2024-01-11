const express = require("express");
const router = express.Router();

const lessonController = require("../app/controllers/LessonController");

const auth = require("../app/middlewares/AuthMiddleware");
const mentor = require("../app/middlewares/MentorMiddleware");

router.get("/", lessonController.index);
router.post("/", auth, mentor, lessonController.store);
router.get("/:id", lessonController.show);
router.patch("/:id", auth, mentor, lessonController.update);
router.delete("/:id", auth, mentor, lessonController.delete);

module.exports = router;
