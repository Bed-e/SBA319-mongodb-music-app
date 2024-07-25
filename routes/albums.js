const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.get("/", albumController.getAllAlbums);
router.get("/:id", albumController.getAlbumById);
router.post("/", albumController.createAlbum);
router.patch("/:id", albumController.updateAlbumById);
router.delete("/:id", albumController.deleteAlbumById);
module.exports = router;
