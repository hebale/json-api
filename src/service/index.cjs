const apis = require("./apis.cjs");
const errors = require("./errors.cjs");

const service = ({ app }) => {
  app
    .get("/", (req, res) => {
      res.type("html");
      res.sendFile(path.resolve(__dirname, "../index.html"));
    })
    .on("error", (err) => {
      process.exit(1);
    });

  apis({ app });
  errors({ app });
};

module.exports = service;
