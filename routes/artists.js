const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist");

// GET all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET an artist by ID
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (artist == null) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new artist
router.post("/", async (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    albums: req.body.albums,
  });

  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an artist
router.patch("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (artist == null) {
      return res.status(404).json({ message: "Artist not found" });
    }

    if (req.body.name != null) {
      artist.name = req.body.name;
    }
    if (req.body.albums != null) {
      artist.albums = req.body.albums;
    }

    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an artist
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (artist == null) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artist.remove();
    res.json({ message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
