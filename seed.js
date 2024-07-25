const mongoose = require("mongoose");
const Song = require("./models/Song");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const seedData = async () => {
  const artists = [
    { name: "Artist One", biography: "Biography of Artist One" },
    { name: "Artist Two", biography: "Biography of Artist Two" },
    { name: "Artist Three", biography: "Biography of Artist Three" },
    { name: "Artist Four", biography: "Biography of Artist Four" },
    { name: "Artist Five", biography: "Biography of Artist Five" },
  ];

  const albums = [
    {
      title: "Album One",
      artistName: "Artist One",
      releaseDate: "2021-01-01",
      genre: "Pop",
    },
    {
      title: "Album Two",
      artistName: "Artist Two",
      releaseDate: "2020-05-12",
      genre: "Rock",
    },
    {
      title: "Album Three",
      artistName: "Artist Three",
      releaseDate: "2019-07-23",
      genre: "Jazz",
    },
    {
      title: "Album Four",
      artistName: "Artist Four",
      releaseDate: "2018-11-30",
      genre: "Classical",
    },
    {
      title: "Album Five",
      artistName: "Artist Five",
      releaseDate: "2017-03-15",
      genre: "Hip-Hop",
    },
  ];

  const songs = [
    {
      title: "Song One",
      artistName: "Artist One",
      albumTitle: "Album One",
      genre: "Pop",
      releaseDate: "2021-01-01",
      duration: 200,
    },
    {
      title: "Song Two",
      artistName: "Artist Two",
      albumTitle: "Album Two",
      genre: "Rock",
      releaseDate: "2020-05-12",
      duration: 180,
    },
    {
      title: "Song Three",
      artistName: "Artist Three",
      albumTitle: "Album Three",
      genre: "Jazz",
      releaseDate: "2019-07-23",
      duration: 240,
    },
    {
      title: "Song Four",
      artistName: "Artist Four",
      albumTitle: "Album Four",
      genre: "Classical",
      releaseDate: "2018-11-30",
      duration: 300,
    },
    {
      title: "Song Five",
      artistName: "Artist Five",
      albumTitle: "Album Five",
      genre: "Hip-Hop",
      releaseDate: "2017-03-15",
      duration: 210,
    },
  ];

  try {
    await mongoose.connection.dropDatabase();

    // Insert artists and create a map of artist names to IDs
    const insertedArtists = await Artist.insertMany(artists);
    const artistMap = {};
    insertedArtists.forEach((artist) => {
      artistMap[artist.name] = artist._id;
    });

    // Insert albums and create a map of album titles to IDs
    albums.forEach((album) => {
      album.artist = artistMap[album.artistName];
      delete album.artistName;
    });
    const insertedAlbums = await Album.insertMany(albums);
    const albumMap = {};
    insertedAlbums.forEach((album) => {
      albumMap[album.title] = album._id;
    });

    // Insert songs and create a map of songs to their corresponding albums and artists
    songs.forEach((song) => {
      song.artist = artistMap[song.artistName];
      song.album = albumMap[song.albumTitle];
      delete song.artistName;
      delete song.albumTitle;
    });
    const insertedSongs = await Song.insertMany(songs);

    // Populate album's songs array
    for (const album of insertedAlbums) {
      const albumSongs = insertedSongs.filter((song) =>
        song.album.equals(album._id)
      );
      await Album.findByIdAndUpdate(album._id, {
        songs: albumSongs.map((song) => song._id),
      });
    }

    // Populate artist's albums array
    for (const artist of insertedArtists) {
      const artistAlbums = insertedAlbums.filter((album) =>
        album.artist.equals(artist._id)
      );
      await Artist.findByIdAndUpdate(artist._id, {
        albums: artistAlbums.map((album) => album._id),
      });
    }

    console.log("Database seeded!");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

seedData();
