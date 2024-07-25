const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Array, required: true },
  album: { type: Array, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
});

SongSchema.index({ title: 1 });

module.exports = mongoose.model("Song", SongSchema);
