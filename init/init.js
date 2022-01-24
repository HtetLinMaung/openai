const axios = require("axios");
const KnownFace = require("../models/KnownFace");

const BASE_URL = process.env.PYOPENAI;

exports.initApp = async () => {
  const known_faces = await KnownFace.find({}, "url label -_id");
  axios
    .post(`${BASE_URL}/face-detector/load-known-faces`, { known_faces })
    .then((res) => console.log(res.data.message))
    .catch(console.log);
};
