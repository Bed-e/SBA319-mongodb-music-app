const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ben17wilson:me123@mongopractice.p59fltt.mongodb.net/?retryWrites=true&w=majority&appName=MongoPractice",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));
