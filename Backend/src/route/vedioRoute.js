const express = require("express");
const vedioData = require("../controller/vedioController");

const router = express.Router();

router.post("/upload", vedioData.createVideo);
router.get("/videos", vedioData.getAllVideos);
router.get("/video/:id", vedioData.getVideoById);

module.exports = router;
