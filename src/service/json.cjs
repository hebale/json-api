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

const root = path.resolve(process.cwd(), "./src/json");

const getBasePath = (_path) =>
  path.resolve(process.cwd(), `./src/json${_path}`);

const jsonService = ({ app }) => {
  /**
   * GET
   */
  app.get("/api/v1/all-jsons", async (_, res) => {
    try {
      const jsonFilesPath = glob.sync(`${root}/**/*.json`);
      const allJson = [];

      jsonFilesPath.forEach((filePath) => {
        console.log(
          process.cwd(),
          filePath,
          path.resolve(process.cwd(), filePath)
        );
        const response = fs.readFileSync(
          path.resolve(process.cwd(), filePath),
          {
            encoding: "utf-8",
            flag: "r",
          }
        );
        const data = JSON.parse(response);

        allJson.push(data);
      });

      res.send({
        code: 200,
        message: "Ok",
        data: allJson,
      });
    } catch (err) {
      console.log(err);

      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
        err,
      });
    }
  });

  app.get("/api/v1/json", async (req, res) => {
    try {
      const query = req.query;

      console.log(
        process.cwd(),
        `${query.path}/index.json`,
        path.join(process.cwd(), `${query.path}/index.json`)
      );

      const response = fs.readFileSync(
        path.resolve(process.cwd(), `src/json${query.path}/index.json`),
        {
          encoding: "utf-8",
          flag: "r",
        }
      );
      const data = JSON.parse(response);

      res.send({
        code: 200,
        message: "Ok",
        data,
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
        err,
      });
    }
  });

  app.get("/api/v1/download", (req, res) => {
    try {
      const { path } = req.query;

      res.sendFile(`${root}${path}\\index.json`);
    } catch (err) {
      res.send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  /**
   * POST
   */
  app.post("/api/v1/regist", (req, res) => {
    try {
      const { path, response } = req.body;
      const basePath = getBasePath(path);

      if (!hasDir(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      fs.writeFileSync(`${basePath}/index.json`, JSON.stringify(response));

      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * PATCH
   */
  app.patch("/api/v1/update-data", (req, res) => {
    try {
      const { path, response } = req.body;
      if (!response) throw new Error("data is not defined");

      const basePath = getBasePath(path);
      const data = fs.readFileSync(`${root}${path}/index.json`, {
        encoding: "utf-8",
        flag: "r",
      });
      const jsonData = JSON.parse(data);

      jsonData.response = JSON.parse(response);

      console.log(jsonData, response, data);

      fs.writeFileSync(
        `${basePath}/index.json`,
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      res.send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  app.patch("/api/v1/update-method", (req, res) => {
    try {
      const { path, method, delay, status } = req.body;

      if (!method && (!delay || !status)) throw new Error("Unvalid Parameters");

      const basePath = getBasePath(path);
      const response = fs.readFileSync(`${root}${path}/index.json`, {
        encoding: "utf-8",
        flag: "r",
      });
      const jsonData = JSON.parse(response);

      if (delay) {
        jsonData.methods = jsonData.methods.map((_) => {
          if (_.method === method) _.delay = delay;
          return _;
        });
      }

      if (status) {
        jsonData.methods = jsonData.methods.map((_) => {
          if (_.method === method) _.status = status;
          return _;
        });
      }

      fs.writeFileSync(
        `${basePath}/index.json`,
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      res.send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  /**
   * DELETE
   */
  app.delete("/api/v1/remove-json", (req, res) => {
    try {
      const { path } = req.body;

      if (!path) throw new Error("Unvalid Parameters");
    } catch {}
  });
};

module.exports = jsonService;
