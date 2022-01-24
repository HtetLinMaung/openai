const { Schema, model } = require("mongoose");
const { REQUIRED_STRING } = require("../constants/mongoose-constants");

const knownFaceSchema = new Schema(
  {
    url: REQUIRED_STRING,
    label: REQUIRED_STRING,
  },
  { timestamps: true }
);

module.exports = model("KnownFace", knownFaceSchema);
