const mongoose = require("mongoose");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Song = require("./models/Song");
require("dotenv").config();

const artistsData = [
  { name: "CharliXCX", biography: "Queen of club classics", albums: [] },
  { name: "Lorde", biography: "Queen of depression", albums: [] },
  { name: "Steely Dan", biography: "No issues within", albums: [] },
  { name: "Bakar", biography: "Cool guy innit", albums: [] },
  { name: "BTS", biography: `stands for "can't be beat"`, albums: [] },
];

const albumsData = [
  [
    {
      title: "brat",
      artist: null,
      songs: [],
      genre: "Pop",
      releaseDate: new Date("2024"),
    },
    {
      title: "Charli",
      artist: null,
      songs: [],
      genre: "Pop",
      releaseDate: new Date("2017"),
    },
  ],
  [
    {
      title: "Melodrama",
      artist: null,
      songs: [],
      genre: "depresssion pop",
      releaseDate: new Date("2017"),
    },
    {
      title: "Pure Heroine",
      artist: null,
      songs: [],
      genre: "young Pop",
      releaseDate: new Date("2016"),
    },
  ],
  [
    {
      title: "Can't buy a thrill",
      artist: null,
      songs: [],
      genre: "Jazz rock",
      releaseDate: new Date("1973"),
    },
    {
      title: "Aja",
      artist: null,
      songs: [],
      genre: "Jazz rock",
      releaseDate: new Date("1978"),
    },
  ],
  [
    {
      title: "Yellow",
      artist: null,
      songs: [],
      genre: "Alternative",
      releaseDate: new Date("2020"),
    },
  ],
  [
    {
      title: "Wings",
      artist: null,
      songs: [],
      genre: "KPOP",
      releaseDate: new Date("2016"),
    },
  ],
];

const songsData = [
  {
    title: "Reelin' in the years",
    artist: null,
    album: null,
    genre: "Jazz Rock",
    duration: 100,
    releaseDate: 1973,
  },
  {
    title: "Apple",
    artist: null,
    album: null,
    genre: "hotgirl pop",
    duration: 169,
    releaseDate: 2024,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Artist.deleteMany();
    await Album.deleteMany();
    await Song.deleteMany();

    const createdArtists = await Artist.insertMany(artistsData);
    albumsData[0].artist = createdArtists[0]._id;
    albumsData[1].artist = createdArtists[1]._id;

    const createdAlbums = await Album.insertMany(albumsData);
    songsData[0].artist = createdArtists[0]._id;
    songsData[0].album = createdAlbums[0]._id;
    songsData[1].artist = createdArtists[1]._id;
    songsData[1].album = createdAlbums[1]._id;

    await Song.insertMany(songsData);

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
