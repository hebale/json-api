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
   * api json 데이터
   */
  app.get("/api/v1/all-jsons", async (req, res) => {
    try {
      const jsonFilesPath = glob.sync(`${root}/**/*.json`);
      const allJson = [];

      jsonFilesPath.forEach((path) => {
        const response = fs.readFileSync(`${process.cwd()}\\${path}`, {
          encoding: "utf-8",
          flag: "r",
        });
        const data = JSON.parse(response);

        allJson.push(data);
      });

      res.send({
        code: 200,
        message: "successed",
        data: allJson,
      });
    } catch (err) {
      console.log(err);

      res.send({
        code: 500,
        message: "server error",
        err,
      });
    }
  });

  /**
   * json 파일 다운로드
   */
  app.get("/api/v1/download", (req, res) => {
    try {
      const { name } = req.query;

      res.sendFile(`${root}${name}\\index.json`);
    } catch (err) {
      res.send({
        code: "000",
        message: "json file download failed!",
      });
    }
  });

  // json 데이터 등록
  app.post("/api/v1/regist", (req, res) => {
    try {
      const { name, data } = req.body;
      const basePath = getBasePath(name);

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

  // app.patch("/api/v1/update-method", (req, res) => {
  //   try {
  //     const { name, method, data } = req.body;

  //     const response = fs.readFileSync(`${root}${name}\\index.json`, {
  //       encoding: "utf-8",
  //       flag: "r",
  //     });
  //     const jsonData = JSON.parse(response);

  //     console.log('before >>>>', jsonData);

  //     if(method) {
  //       jsonData.
  //     }else{
  //       jsonData.data = data;
  //     }

  //     console.log('after >>>>>>>', jsonData)

  //     fs.writeFile(`${basePath}/index.json`, jsonData);

  //     res.send({
  //       code: 200,
  //       message: "json is updated",
  //     });
  //   } catch (err) {
  //     res.send({
  //       code: "000",
  //       message: "json file update failed!",
  //     });
  //   }
  // });

  /**
   * response data 업데이트
   */
  app.patch("/api/v1/update-data", (req, res) => {
    try {
      const { name, data } = req.body;
      if (!data) throw new Error("data is not defined");

      const basePath = getBasePath(name);
      const response = fs.readFileSync(`${root}${name}\\index.json`, {
        encoding: "utf-8",
        flag: "r",
      });
      const jsonData = JSON.parse(response);

      jsonData.data = JSON.parse(data);

      fs.writeFileSync(
        `${basePath}/index.json`,
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: "json is updated",
      });
    } catch (err) {
      res.send({
        code: "000",
        message: "json file update failed!",
      });
    }
  });

  /**
   * method 정보 업데이트
   */
  app.patch("/api/v1/update-method", (req, res) => {
    try {
      const { name, method, delay, status } = req.body;

      if (!method && (!delay || !status)) throw new Error("Unvalid Parameters");

      const basePath = getBasePath(name);
      const response = fs.readFileSync(`${root}${name}\\index.json`, {
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
        message: "json is updated",
      });
    } catch (err) {
      res.send({
        code: "000",
        message: "json file update failed!",
      });
    }
  });

  // app.use("/api/v1/jsons", (req, res) => {
  //   try {
  //     const { query, method, headers, body } = req;

  //     switch (method) {
  //       case "GET":
  //         const jsonFilesPath = glob
  //           .sync(`${root}/**/*.json`)
  //           .map((filePath) => path.normalize(`../../${filePath.toString()}`));

  //         // const jsonFilesPath = fs
  //         //   .readdirSync(`${process.cwd()}/src/json/`)
  //         //   .filter((allFilesPaths) => allFilesPaths.match(/\.json$/) !== null);

  //         console.log(jsonFilesPath);

  //         res.send({
  //           code: 200,
  //           message: "successed",
  //           data: JSON.parse(jsonFilesPath),
  //         });
  //     }
  //   } catch (err) {
  //     console.log(err);

  //     res.send({
  //       code: 500,
  //       message: "server error",
  //       err,
  //     });
  //   }
  // });
};

module.exports = jsonService;
