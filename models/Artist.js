const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

ArtistSchema.index({ name: 1 });

module.exports = mongoose.model("Artist", ArtistSchema);
