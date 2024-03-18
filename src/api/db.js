const fs = require("fs");
const path = require("path");

const hasDb = (path) => {
  try {
    return fs.lstatSync(path);
  } catch (err) {
    return false;
  }
};

module.exports = (app) => {
  app.get("/api/db", (req, res) => {
    try {
      const readPath = path.resolve(
        __dirname,
        `../db${req.query.name}/index.json`
      );

      const data = fs.readFileSync(readPath);

      res.send({
        code: 200,
        date: JSON.parse(data),
      });
    } catch (err) {
      res.send(err);
    }
  });

  app.post("/api/db", (req, res) => {
    try {
      if (!req.body.name)
        throw { code: "000", message: "db name is not defined!" };
      const createPath = path.resolve(__dirname, `../db${req.body.name}`);

      if (!hasDb(createPath)) {
        fs.mkdirSync(createPath, { recursive: true });
      }

      fs.writeFileSync(`${createPath}/index.json`, JSON.stringify(req.body));

      res.send({
        code: 200,
        message: "json is created!",
      });
    } catch (err) {
      res.send(err);
    }
  });

  app.patch("/api/db", (req, res) => {
    try {
      const updatePath = path.resolve(__dirname, `../db${req.body.name}`);

      if (!hasDb) throw { code: "0000", message: "Db is not " };

      fs.writeFileSync(`${updatePath}/index.json`, JSON.stringify(req.body));

      res.send({
        code: 200,
        message: "file is updated",
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/api/db", (req, res) => {
    try {
      if (!req.body.name)
        throw { code: "000", message: "db name is not defined!" };
      const deletePath = path.resolve(__dirname, `../db${req.body.name}`);

      fs.rmdirSync(deletePath, {
        recursive: true,
        force: true,
      });

      res.send({
        code: 200,
        message: "db is deleted",
      });
    } catch (err) {
      console.log(err);
    }
  });
};
