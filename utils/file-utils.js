const path = require("path");
const fs = require("fs");

const public_path = path.join(__dirname, "..", "public");

exports.dataUrlToFile = (dataurl, filename) => {
  const filepath = path.join(public_path, filename);
  fs.writeFileSync(filepath, dataurl, "base64", (err) => {
    throw new Error(err.message);
  });
};
