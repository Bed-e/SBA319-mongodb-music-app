const mongoose = require("mongoose");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Song = require("./models/Song");
require("dotenv").config();

const artistsData = [
  { name: "CharliXCX", biography: "Queen of club classics" },
  { name: "Lorde", biography: "Queen of depression" },
  { name: "Steely Dan", biography: "No issues within" },
  { name: "Bakar", biography: "Cool guy innit" },
  { name: "BTS", biography: `stands for "can't be beat"` },
];

const albumsData = [
  [
    {
      title: "brat",
      genre: "Pop",
      releaseDate: new Date("2024-01-01"),
    },
    {
      title: "Charli",
      genre: "Pop",
      releaseDate: new Date("2017-01-01"),
    },
  ],
  [
    {
      title: "Melodrama",
      genre: "Depression Pop",
      releaseDate: new Date("2017-01-01"),
    },
    {
      title: "Pure Heroine",
      genre: "Young Pop",
      releaseDate: new Date("2016-01-01"),
    },
  ],
  [
    {
      title: "Can't buy a thrill",
      genre: "Jazz Rock",
      releaseDate: new Date("1973-01-01"),
    },
    {
      title: "Aja",
      genre: "Jazz Rock",
      releaseDate: new Date("1978-01-01"),
    },
  ],
  [
    {
      title: "Yellow",
      genre: "Alternative",
      releaseDate: new Date("2020-01-01"),
    },
  ],
  [
    {
      title: "Wings",
      genre: "KPOP",
      releaseDate: new Date("2016-01-01"),
    },
  ],
];

const songsData = [
  [
    {
      title: "Apple",
      genre: "Hotgirl Pop",
      duration: 169,
      releaseDate: new Date("2024-01-01"),
    },
    {
      title: "Club Classics",
      genre: "Hotgirl Pop",
      duration: 269,
      releaseDate: new Date("2024-01-01"),
    },
  ],
  [
    {
      title: "Next Level Charli",
      genre: "Pop",
      duration: 110,
      releaseDate: new Date("2018-01-01"),
    },
    {
      title: "White Mercedes",
      genre: "Pop",
      duration: 1110,
      releaseDate: new Date("2018-01-01"),
    },
  ],
  [
    {
      title: "Green Light",
      genre: "Indie Pop",
      duration: 110,
      releaseDate: new Date("2016-01-01"),
    },
    {
      title: "The Louvre",
      genre: "Indie Pop",
      duration: 1110,
      releaseDate: new Date("2016-01-01"),
    },
  ],
  [
    {
      title: "Tennis Courts",
      genre: "Indie Pop",
      duration: 310,
      releaseDate: new Date("2014-01-01"),
    },
    {
      title: "Royals",
      genre: "Indie Pop",
      duration: 1110,
      releaseDate: new Date("2014-01-01"),
    },
  ],
  [
    {
      title: "Reelin' in the years",
      genre: "Jazz Rock",
      duration: 130,
      releaseDate: new Date("1973-01-01"),
    },
    {
      title: "Do it again",
      genre: "Jazz Rock",
      duration: 1110,
      releaseDate: new Date("1973-01-01"),
    },
  ],
  [
    {
      title: "Black Cow",
      genre: "Jazz Rock",
      duration: 310,
      releaseDate: new Date("1973-01-01"),
    },
    {
      title: "Aja",
      genre: "Jazz Rock",
      duration: 1120,
      releaseDate: new Date("1973-01-01"),
    },
  ],
  [
    {
      title: "All Night",
      genre: "Alt R&B",
      duration: 133,
      releaseDate: new Date("2022-01-01"),
    },
    {
      title: "Selling Biscuits",
      genre: "Alt R&B",
      duration: 210,
      releaseDate: new Date("2022-01-01"),
    },
  ],
  [
    {
      title: "Begin",
      genre: "KPOP",
      duration: 230,
      releaseDate: new Date("2016-01-01"),
    },
    {
      title: "Stigma",
      genre: "KPOP",
      duration: 1320,
      releaseDate: new Date("2016-01-01"),
    },
  ],
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Artist.deleteMany();
    await Album.deleteMany();
    await Song.deleteMany();

    // Create artists
    const createdArtists = await Artist.insertMany(artistsData);

    // Create albums and associate with artists
    const createdAlbumsArray = [];
    for (let i = 0; i < albumsData.length; i++) {
      const albums = albumsData[i];
      for (let j = 0; j < albums.length; j++) {
        albums[j].artist = createdArtists[i]._id;
      }
      const createdAlbums = await Album.insertMany(albums);
      createdAlbumsArray.push(...createdAlbums);

      // Update artists with album IDs
      const albumIds = createdAlbums.map((album) => album._id);
      await Artist.findByIdAndUpdate(
        createdArtists[i]._id,
        { $push: { albums: { $each: albumIds } } },
        { new: true }
      );
    }

    // Create songs and associate with albums and artists
    for (let i = 0; i < songsData.length; i++) {
      const artistIndex = Math.floor(i / 2);
      const albumIndex = i % 2;
      const songs = songsData[i];
      for (let j = 0; j < songs.length; j++) {
        songs[j].artist = createdArtists[artistIndex]._id;
        songs[j].album = createdAlbumsArray[artistIndex * 2 + albumIndex]._id;
      }
      const createdSongs = await Song.insertMany(songs);

      // Update albums with song IDs
      for (let j = 0; j < createdSongs.length; j++) {
        await Album.findByIdAndUpdate(
          createdSongs[j].album,
          { $push: { songs: createdSongs[j]._id } },
          { new: true }
        );
      }
    }

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
