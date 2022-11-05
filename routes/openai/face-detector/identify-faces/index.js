const { brewBlankExpressFunc } = require("code-alchemy");
const { default: http } = require("starless-http");
const { BASE_URL } = require("../../../../constants/constants");
const { SERVER_ERROR } = require("../../../../constants/response-constants");

module.exports = brewBlankExpressFunc(async (req, res) => {
  let [response, err] = await http.post(
    `${BASE_URL}/face-detector/identify-faces`,
    req.body
  );
  if (err) {
    if ("response" in err) {
      response = err.response;
    } else {
      response = {
        data: {
          code: SERVER_ERROR.code,
          message: err.message,
        },
      };
    }
  }
  if (response.data.code == 500) {
    return res.status(SERVER_ERROR.code).json(response.data);
  }
  res.json(response.data);
});
