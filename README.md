# Music Database Application

This project is a Node.js, Express, and MongoDB application that manages a music database. The application allows you to perform CRUD operations on songs, artists, and albums.

## Project Structure

- `server.js`: Main entry point for the application. Sets up the Express server and connects to MongoDB.
- `models/`: Contains Mongoose schemas for `Song`, `Artist`, and `Album`.
  - `Song.js`: Schema for the songs collection.
  - `Artist.js`: Schema for the artists collection.
  - `Album.js`: Schema for the albums collection.
- `routes/`: Contains Express routes for handling API requests.
  - `songs.js`: CRUD routes for songs.
  - `artists.js`: CRUD routes for artists.
  - `albums.js`: CRUD routes for albums.
- `seed.js`: Script for populating the database with sample data.
- `.env`: Environment variables file (not included in the repository, create this file and add your MongoDB URI).
- `package.json`: Contains project dependencies and scripts.

## Project Requirements

### Minimum Requirements

1. **Use at least three different data collections**:

   - Collections: `songs`, `artists`, and `albums` (defined in `models/Song.js`, `models/Artist.js`, and `models/Album.js`).

2. **Utilize reasonable data modeling practices**:

   - Data modeling is implemented using Mongoose schemas (`models/Song.js`, `models/Artist.js`, and `models/Album.js`).

3. **Create GET routes for all data that should be exposed to the client**:

   - GET routes are defined in `routes/songs.js`, `routes/artists.js`, and `routes/albums.js`.

4. **Create POST routes for data**:

   - POST route is defined in `routes/albums.js`.

5. **Create PATCH or PUT routes for data**:

   - PATCH route is defined in `routes/albums.js`.

6. **Create DELETE routes for data**:

   - DELETE route is defined in `routes/albums.js`.

7. **Include sensible indexes**:

   - Indexes are defined in the Mongoose schemas (`models/Song.js`, `models/Artist.js`, and `models/Album.js`).

8. **Include sensible MongoDB data validation rules**:

   - Validation rules are implemented in the Mongoose schemas (`models/Song.js`, `models/Artist.js`, and `models/Album.js`).

9. **Populate your application's collections with sample data**:
   - Sample data is provided in `seed.js`.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB URI for connecting to your MongoDB instance.

### Installation

1. Clone the repository:

2. Install dependncies

   ```
   npm i
   ```

3. Create a .env file in the root directory and add your MongoDB URI and port:
   ```
   MONGO_URI=mongodb+srv://\<user>:\<pw>@mongopractice.p59fltt.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice
   PORT=5002
   ```
   make sure to replace \<user> with your mongodb username and \<pw> with your mongodb password
4. Seed the database with sample data:

   node seed.js

### Running the Application

1. Start the server
   npm/nodemon start
   The server will run on http://localhost:5002/

### API Endpoints

1. GET /albums: Get all albums
2. GET /artists: Get all artists
3. GET /songs: Get all songs
4. GET /albums/:id: Get an album by ID
5. POST /albums: Create a new album
6. PATCH /albums/:id: Update an album by ID
7. DELETE /albums/:id: Delete an album by ID
