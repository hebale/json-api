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

const getBasePath = (apiPath) =>
  path.resolve(process.cwd(), `./src/json${apiPath}`);

const jsonService = ({ app }) => {
  /**
   * 모든 JSON 데이터 검색
   */
  app.get("/api/v1/all", async (_, res) => {
    try {
      const jsonFilesPath = glob.sync(`${root}/**/*.json`);
      const allJson = [];

      jsonFilesPath.forEach((filePath) => {
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

  /**
   * 단일 JSON 데이터 검색
   */
  app.get("/api/v1/json", async (req, res) => {
    try {
      const { apiPath } = req.query;
      const response = fs.readFileSync(
        path.resolve(process.cwd(), `src/json${apiPath}/index.json`),
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

  /**
   * 단일 JSON파일 다운로드
   */
  app.get("/api/v1/download", (req, res) => {
    try {
      const { apiPath } = req.query;

      res.sendFile(`${root}${apiPath}/index.json`);
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  /**
   * 단일 JSON파일 등록
   */
  app.post("/api/v1/json", (req, res) => {
    try {
      const { apiPath, response } = req.body;
      const basePath = getBasePath(apiPath);

      if (!hasDir(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      fs.writeFileSync(`${basePath}/index.json`, JSON.parse(response));

      res.status(500).send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      console.log(err);
    }
  });

  /**
   *  단일 JSON파일 response값 수정
   */
  app.patch("/api/v1/json/response", (req, res) => {
    try {
      const { apiPath, response } = req.body;
      if (!response) throw new Error("data is not defined");

      const basePath = getBasePath(apiPath);
      const data = fs.readFileSync(`${root}${apiPath}/index.json`, {
        encoding: "utf-8",
        flag: "r",
      });
      const jsonData = JSON.parse(data);

      jsonData.response = JSON.parse(response);

      fs.writeFileSync(
        path.join(basePath, "/index.json"),
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  /**
   *  단일 JSON파일 methods값 수정
   */
  app.patch("/api/v1/json/methods", (req, res) => {
    try {
      const { apiPath, method, delay, status } = req.body;

      if (!method && (!delay || !status)) throw new Error("Unvalid Parameters");

      const basePath = getBasePath(apiPath);
      const response = fs.readFileSync(`${root}${apiPath}/index.json`, {
        encoding: "utf-8",
        flag: "r",
      });
      const jsonData = JSON.parse(response);

      if (delay === 0 || delay) {
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
        path.join(basePath, "/index.json"),
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });

  /**
   * 단일 JSON파일 전체수정
   */
  app.put("/api/v1/json", (req, res) => {
    try {
      const { apiPath, response } = req.body;
      const basePath = getBasePath(apiPath);

      if (!hasDir(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      fs.writeFileSync(
        path.join(basePath, "/index.json"),
        JSON.stringify(response, null, 2)
      );

      res.status(500).send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * 단일 JSON파일 삭제
   */
  app.delete("/api/v1/json", (req, res) => {
    try {
      const { apiPath } = req.body;
      if (!apiPath) throw new Error("Unvalid Parameters");

      fs.rmSync(path.join(root, apiPath, "/index.json"));
      /**
       * ※추가※ 폴더정리 함수필요
       */
      res.send({
        code: 200,
        message: "Ok",
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
};

module.exports = jsonService;

// function cleanEmptyFoldersRecursively(folder) {
//   var fs = require('fs');
//   var path = require('path');

//   var isDir = fs.statSync(folder).isDirectory();
//   if (!isDir) {
//     return;
//   }
//   var files = fs.readdirSync(folder);
//   if (files.length > 0) {
//     files.forEach(function(file) {
//       var fullPath = path.join(folder, file);
//       cleanEmptyFoldersRecursively(fullPath);
//     });

//     // re-evaluate files; after deleting subfolder
//     // we may have parent folder empty now
//     files = fs.readdirSync(folder);
//   }

//   if (files.length == 0) {
//     console.log("removing: ", folder);
//     fs.rmdirSync(folder);
//     return;
//   }
// }
