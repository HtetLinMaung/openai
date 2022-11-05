const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const KnownFace = require("./models/KnownFace");
const { default: http } = require("starless-http");
const { BASE_URL } = require("./constants/constants");
const fs = require("node:fs");

const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage });

exports.beforeServerStart = async (app) => {
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }
  app.use(upload.single("image"));
  app.use("/openai", express.static("public"));

  await mongoose.connect(process.env.DB_CONNECTION);
  const known_faces = await KnownFace.find({}, "url label -_id");
  console.log(known_faces);
  console.log("MongoDB connected!");
  http
    .post(`${BASE_URL}/face-detector/load-known-faces`, { known_faces })
    .then(([res]) => {
      console.log(res.data);
    })
    .catch(console.log);
};
