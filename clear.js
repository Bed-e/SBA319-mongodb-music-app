const mongoose = require("mongoose");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Song = require("./models/Song");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const artistsData = [
  "Washington",
  "Adams",
  "Jefferson",
  "Madison",
  "Monroe",
  "Adams",
  "Jackson",
  "Van Buren",
  "Harrison",
  "Tyler",
  "Polk",
  "Taylor",
  "Fillmore",
  "Pierce",
  "Buchanan",
  "Lincoln",
  "Johnson",
  "Grant",
  "Hayes",
  "Garfield",
  "Arthur",
  "Cleveland",
  "McKinley",
  "Roosevelt",
  "Taft",
  "Wilson",
  "Harding",
  "Coolidge",
  "Hoover",
  "Roosevelt",
  "Truman",
  "Eisenhower",
  "Kennedy",
  "Johnson",
  "Nixon",
  "Ford",
  "Carter",
  "Reagan",
  "Bush",
  "Clinton",
  "Bush",
  "Obama",
  "Trump",
  "Biden",
];

const albumsData = [
  "Elephant",
  "Tiger",
  "Giraffe",
  "Panda",
  "Kangaroo",
  "Penguin",
  "Koala",
  "Zebra",
  "Lion",
  "Bear",
  "Dolphin",
  "Whale",
  "Shark",
  "Eagle",
  "Falcon",
  "Hawk",
  "Owl",
  "Parrot",
  "Seal",
  "Otter",
];

const songsData = [
  "Hand",
  "Foot",
  "Arm",
  "Leg",
  "Elbow",
  "Knee",
  "Wrist",
  "Shoulder",
  "Hip",
  "Ankle",
  "Finger",
  "Toe",
  "Back",
  "Chest",
  "Head",
  "Neck",
  "Belly",
  "Thigh",
  "Calf",
  "Heel",
];

async function seedDB() {
  try {
    // Clear existing data
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Song.deleteMany({});

    // // Create artists
    // const artists = await Artist.insertMany(
    //   artistsData.map((name) => ({ name, biography: `Biography of ${name}` }))
    // );

    // // Create albums with empty song lists
    // const albums = await Album.insertMany(
    //   albumsData.map((title, index) => ({
    //     title,
    //     artist: artists[index % artists.length]._id,
    //     releaseDate: new Date(),
    //     genre: "Genre " + (index % 5),
    //     songs: [],
    //   }))
    // );

    // // Create songs
    // const songs = await Song.insertMany(
    //   songsData.map((title, index) => ({
    //     title,
    //     artist: artists[index % artists.length]._id,
    //     album: albums[index % albums.length]._id,
    //     genre: "Genre " + (index % 5),
    //     releaseDate: new Date(),
    //     duration: Math.floor(Math.random() * 300), // Random duration between 0 and 300 seconds
    //   }))
    // );

    // // Update albums to include song IDs
    // for (const album of albums) {
    //   const songIds = songs
    //     .filter((song) => song.album.equals(album._id))
    //     .map((song) => song._id);
    //   await Album.findByIdAndUpdate(album._id, { songs: songIds });
    // }

    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    mongoose.connection.close();
  }
}
seedDB();
