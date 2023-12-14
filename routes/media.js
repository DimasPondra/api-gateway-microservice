const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = "temp";
        const uploadPath = path.join(__dirname, `../public/uploads/${directory}`);

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const mediaController = require("../app/controllers/MediaController");

router.post("/", upload.array("files"), mediaController.store);

module.exports = router;
