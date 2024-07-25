const Album = require("../models/Album");

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("artist songs");
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAlbum = async (req, res) => {
  const album = new Album(req.body);
  try {
    const newAlbum = await album.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
