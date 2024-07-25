const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/", songController.getAllSongs);
router.get("/:id", songController.getSongById);
router.post("/", songController.createSong);
router.patch("/:id", songController.updateSongById);
router.delete("/:id", songController.deleteSongById);

module.exports = router;
