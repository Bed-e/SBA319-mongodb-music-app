const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

AlbumSchema.index({ title: 1 });

module.exports = mongoose.model("Album", AlbumSchema);
