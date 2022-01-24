const express = require("express");
const { createWorker } = require("tesseract.js");
const { OK, SERVER_ERROR } = require("../constants/response-constants");

const router = express.Router();

router.post("/recognize-text", async (req, res) => {
  try {
    console.log("Executing recognize-text");
    const worker = createWorker({
      logger: (m) => console.log(m), // Add logger here
    });
    let buffer = null;
    if (req.file) {
      buffer = req.file.buffer;
    } else {
      const image = req.body.image;
      if (image && image.includes("http")) {
        buffer = image;
      } else if (image) {
        buffer = Buffer.from(image, "base64");
      }
    }

    if (!buffer) {
      return res.status(400).send("No files were uploaded.");
    }

    await worker.load();
    await worker.loadLanguage(req.body.langs || "eng");
    await worker.initialize(req.body.langs || "eng");

    let data = "";
    if (req.body.rectangles && Array.isArray(req.body.rectangles)) {
      data = [];
      for (const rectangle of req.body.rectangles) {
        const result = await worker.recognize(buffer, { rectangle });
        data.push(result.data.text);
      }
    } else {
      const result = await worker.recognize(buffer);
      data = result.data.text;
    }

    await worker.terminate();

    console.log("Executed recognize-text");
    res.json({ ...OK, data });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
});

module.exports = router;
