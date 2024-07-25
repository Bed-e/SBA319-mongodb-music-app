const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors());
app.use(express.json());

const artistsRouter = require("./routes/artists");
const albumsRouter = require("./routes/albums");
const songsRouter = require("./routes/songs");

app.use("/api/artists", artistsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/songs", songsRouter);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
