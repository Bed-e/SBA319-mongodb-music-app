const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/", songController.getAllSongs);
router.post("/", songController.createSong);
// Add other routes as needed

module.exports = router;
