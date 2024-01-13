const express = require("express");
const router = express.Router();

const reviewController = require("../app/controllers/ReviewController");

const auth = require("../app/middlewares/AuthMiddleware");

router.post("/", auth, reviewController.store);
router.get("/:id", reviewController.show);
router.patch("/:id", auth, reviewController.update);
router.delete("/:id", auth, reviewController.delete);

module.exports = router;
