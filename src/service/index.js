const jsonService = require("./jsonService.cjs");

const Service = ({ app }) => {
  app
    .get("/", (req, res) => {
      res.type("html");
      res.sendFile(path.resolve(__dirname, "../index.html"));
    })
    .on("error", (err) => {
      process.exit(1);
    });

  // json curd
  jsonService({ app });
};

module.exports = Service;
