const mongoose = require("mongoose");

require("dotenv").config();
// const mongoURL = 'mongodb://localhost:27017/test'
// const mongoURL = 'mongodb+srv://shabbirsidhpurwala7000:1234Shacluster0.z65usxy.mongodb.net/'

const mongoURL = process.env.MongoDB_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.error(console, "MongoDB connection error:");
});

db.on("connected", () => console.log("MongoDB connected"));

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
