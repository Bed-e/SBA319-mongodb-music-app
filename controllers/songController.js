const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artist album");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate("artist album");
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSong = async (req, res) => {
  const song = new Song(req.body);
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    Object.assign(song, req.body);
    const updatedSong = await song.save();
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await song.remove();
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
