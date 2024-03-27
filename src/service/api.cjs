const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const root = path.resolve(process.cwd(), "./src/json");

const statusMessage = {
  200: "Ok",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  500: "Internal Server Error",
  501: "Not Implemented",
  505: "HTTP Version Not Supported",
};

const api = ({ app }) => {
  app.use("/*", (req, res) => {
    try {
      const filePath = glob.sync(`${path.join(root, req.baseUrl)}/index.json`);

      if (!filePath.length) throw { code: 404, message: statusMessage["404"] };

      const response = fs.readFileSync(
        path.resolve(process.cwd(), filePath[0]),
        {
          encoding: "utf-8",
          flag: "r",
        }
      );

      const json = JSON.parse(response);
      const settings = json.methods.filter(
        ({ method }) => method === req.method
      )[0];

      if (!settings) throw { code: 405, message: statusMessage["405"] };

      const { delay, status, code } = settings;
      const data = code
        ? eval(code)(req.query, req.body, json.response)
        : json.response;

      setTimeout(() => {
        res.status(status).send({
          status,
          message: statusMessage[status],
          data: data ?? [],
        });
      }, delay);
    } catch (err) {
      res.status(err.code).send(err);
    }
  });
};

module.exports = api;
