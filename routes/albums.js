const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.get("/", albumController.getAllAlbums);
router.post("/", albumController.createAlbum);
// Add other routes as needed

module.exports = router;
