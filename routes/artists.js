const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

router.get("/", artistController.getAllArtists);
router.get("/:id", artistController.getArtistById);
router.post("/", artistController.createArtist);
router.patch("/:id", artistController.updateArtistById);
router.delete("/:id", artistController.deleteArtistById);

module.exports = router;
