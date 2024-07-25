const Artist = require("../models/Artist");

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate("albums");
    res.json(artists);
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
