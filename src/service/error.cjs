const errorService = ({ app }) => {
  app.use((req, res, next) => {
    res.status(404).send("Not Found");
  });
  app.use(function (err, req, res, next) {
    res.status(500).send("Internal Server Error");
  });
};

module.exports = errorService;
