const Album = require("../models/Album");

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(album);
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

exports.updateAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    Object.assign(album, req.body);
    const updatedAlbum = await album.save();
    res.json(updatedAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAlbumById = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // await album.remove();
    res.json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
