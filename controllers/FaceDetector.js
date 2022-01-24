const express = require("express");
const axios = require("axios");
const { SERVER_ERROR } = require("../constants/response-constants");
const KnownFace = require("../models/KnownFace");

const BASE_URL = process.env.PYOPENAI;

const router = express.Router();

router.post("/detect-faces", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/face-detector/detect-faces`,
      req.body
    );
    if (response.data.code == 500) {
      return res.status(SERVER_ERROR.code).json(SERVER_ERROR);
    }
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
});

router.post("/add-known-faces", async (req, res) => {
  try {
    KnownFace.insertMany(req.body.known_faces);
    const response = await axios.post(
      `${BASE_URL}/face-detector/add-known-faces`,
      req.body
    );
    if (response.data.code == 500) {
      return res.status(SERVER_ERROR.code).json(SERVER_ERROR);
    }
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
});

router.post("/identify-faces", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/face-detector/identify-faces`,
      req.body
    );
    if (response.data.code == 500) {
      return res.status(SERVER_ERROR.code).json(SERVER_ERROR);
    }
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
});

module.exports = router;
