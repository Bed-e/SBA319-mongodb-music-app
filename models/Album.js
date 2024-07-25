const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  songs: { type: Array },
});

AlbumSchema.index({ title: 1 });

module.exports = mongoose.model("Album", AlbumSchema);
