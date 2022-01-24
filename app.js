require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const { initApp } = require("./init/init");
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage });

const PORT = process.env.PORT || 7070;

const app = express();

app.use(cors());
app.use(express.json());
app.use(upload.single("image"));
app.use("/openai", express.static("public"));

app.use("/openai/text-detector", require("./controllers/TextDetector"));
app.use("/openai/face-detector", require("./controllers/FaceDetector"));

app.get("/openai", (req, res) => {
  res.send(
    `<div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
        <h1>OpenAI Server Online</h1>
    </div>`
  );
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    initApp();
  })
  .catch(console.log);
