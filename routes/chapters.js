const express = require("express");
const router = express.Router();

const chapterController = require("../app/controllers/ChapterController");

const auth = require("../app/middlewares/AuthMiddleware");
const mentor = require("../app/middlewares/MentorMiddleware");

router.get("/", chapterController.index);
router.post("/", auth, mentor, chapterController.store);
router.get("/:id", chapterController.show);
router.patch("/:id", auth, mentor, chapterController.update);
router.delete("/:id", auth, mentor, chapterController.delete);

module.exports = router;
