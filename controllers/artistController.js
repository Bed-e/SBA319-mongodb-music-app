const Artist = require("../models/Artist");

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate("albums");
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("albums");
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArtist = async (req, res) => {
  const artist = new Artist(req.body);
  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    Object.assign(artist, req.body);
    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artist.remove();
    res.json({ message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
