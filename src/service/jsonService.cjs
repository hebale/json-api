const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const hasDir = (path) => {
  try {
    return fs.lstatSync(path);
  } catch (err) {
    return false;
  }
};

try {
} catch (err) {}

const getBasePath = (_path) =>
  path.resolve(process.cwd(), `./src/json${_path}`);

const jsonService = ({ app }) => {

  app.get('/api/v1/all-jsons', async (req, res) => {
    try {
      const files = await glob(`${process.cwd()}/src/json/**/*.json`);

    } catch (err) {
      console.log(err)
    }
  });

  app.post("/api/v1/regist", (req, res) => {
    try {
      const { path, data } = req.body;
      const basePath = getBasePath(path);

      if (!hasDir(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      fs.writeFileSync(`${basePath}/index.json`, JSON.stringify(data));

      res.send({
        code: 200,
        message: "json is created!",
      });
    } catch (err) {
      console.log(err);
    }
  });
  //
  //
  //
  app.use("/api/v1/jsons", async (req, res) => {
    try {
      const { query, method, headers, body } = req;

      switch (method) {
        case "GET":
          // const { path } = body;
          const files = (await glob(`${process.cwd()}/src/json/**/*.json`))
            .map(file => );

          // const files = fs
          //   .readdirSync(`${process.cwd()}/src/json/`)
          //   .filter((allFilesPaths) => allFilesPaths.match(/\.json$/) !== null);

          console.log(files);

          res.send({
            code: 200,
            message: "successed",
            data: JSON.stringify(files),
          });
      }
    } catch (err) {
      res.send({
        code: 500,
        message: "server error",
        err,
      });
    }
  });

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

      if (!hasDir(createPath)) {
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

      if (!hasDir) throw { code: "0000", message: "Db is not " };

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

module.exports = jsonService;
