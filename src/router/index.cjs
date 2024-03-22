const serviceRoute = require("./serviceRoute.cjs");
const errorRoute = require("./errorRoute.cjs");

const Service = ({ app }) => {
  app
    .get("/", (req, res) => {
      res.type("html");
      res.sendFile(path.resolve(__dirname, "../index.html"));
    })
    .on("error", (err) => {
      process.exit(1);
    });

  serviceRoute({ app });
  errorRoute({ app });
};

module.exports = Service;
