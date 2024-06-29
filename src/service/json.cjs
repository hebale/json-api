const $fs = require('fs');
const $path = require('path');
const { glob: $glob } = require('glob');

const hasDir = (path) => {
  try {
    return $fs.lstatSync(path);
  } catch (err) {
    return false;
  }
};

const root = $path.resolve(process.cwd(), './src/json');

const getBasePath = (path) => $path.resolve(process.cwd(), `./src/json${path}`);

const json = ({ app }) => {
  /**
   * 모든 JSON 데이터 검색
   */
  app.get('/api/v1/all', async (_, res) => {
    try {
      const jsonFilesPath = $glob.sync(`${root}/**/*.json`);
      const allJson = [];

      if (_?.body?.error) {
        res.status(500).send({
          code: 500,
          message: 'error 다',
        });
      }

      jsonFilesPath.forEach((filePath) => {
        const response = $fs.readFileSync(
          $path.resolve(process.cwd(), filePath),
          {
            encoding: 'utf-8',
            flag: 'r',
          }
        );
        const data = JSON.parse(response);

        allJson.push(data);
      });

      res.send({
        code: 200,
        message: 'Ok',
        data: allJson,
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
        err,
      });
    }
  });

  /**
   * 단일 JSON 데이터 검색
   */
  app.get('/api/v1/json', async (req, res) => {
    try {
      const { path } = req.query;
      const response = $fs.readFileSync(
        $path.resolve(process.cwd(), `src/json${path}/index.json`),
        {
          encoding: 'utf-8',
          flag: 'r',
        }
      );
      const data = JSON.parse(response);

      res.send({
        code: 200,
        message: 'Ok',
        data,
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
        err,
      });
    }
  });

  /**
   * 단일 JSON파일 다운로드
   */
  app.get('/api/v1/download', (req, res) => {
    try {
      const { path } = req.query;
      const basePath = getBasePath(path);

      res.sendFile(`${basePath}/index.json`);
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });

  /**
   * 단일 JSON파일 등록
   */
  app.post('/api/v1/json', (req, res) => {
    try {
      const { data } = req.body;
      const basePath = getBasePath(data.path);

      if (!hasDir(basePath)) {
        $fs.mkdirSync(basePath, { recursive: true });
      }

      $fs.writeFileSync(
        `${basePath}/index.json`,
        JSON.stringify(data, null, 2)
      );

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });

  /**
   *  단일 JSON파일 headers값 수정
   */
  app.patch('/api/v1/json/headers', (req, res) => {
    try {
      const { path, headers } = req.body;
      if (!headers) throw new Error('data is not defined');

      const basePath = getBasePath(path);
      const response = $fs.readFileSync(`${basePath}/index.json`, {
        encoding: 'utf-8',
        flag: 'r',
      });
      const jsonData = JSON.parse(response);

      jsonData.headers = headers;

      $fs.writeFileSync(
        $path.join(basePath, '/index.json'),
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });

  /**
   *  단일 JSON파일 methods값 수정
   */
  app.patch('/api/v1/json/methods', (req, res) => {
    try {
      const { path, method, delay, status } = req.body;
      if (!method && (!delay || !status)) throw new Error('Unvalid Parameters');

      const basePath = getBasePath(path);
      const response = $fs.readFileSync(`${basePath}/index.json`, {
        encoding: 'utf-8',
        flag: 'r',
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

      $fs.writeFileSync(
        $path.join(basePath, '/index.json'),
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });

  /**
   *  단일 JSON파일 response값 수정
   */
  app.patch('/api/v1/json/response', (req, res) => {
    try {
      const { path, response } = req.body;
      if (!response) throw new Error('data is not defined');

      const basePath = getBasePath(path);
      const data = $fs.readFileSync(`${basePath}/index.json`, {
        encoding: 'utf-8',
        flag: 'r',
      });
      const jsonData = JSON.parse(data);

      jsonData.response = JSON.parse(response);

      $fs.writeFileSync(
        $path.join(basePath, '/index.json'),
        JSON.stringify(jsonData, null, 2)
      );

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });

  /**
   * 단일 JSON파일 전체수정
   */
  app.put('/api/v1/json', (req, res) => {
    try {
      const { path, response } = req.body;
      const basePath = getBasePath(path);

      if (!hasDir(basePath)) {
        $fs.mkdirSync(basePath, { recursive: true });
      }

      $fs.writeFileSync(
        $path.join(basePath, '/index.json'),
        JSON.stringify(response, null, 2)
      );

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      console.log(err);
    }
  });

  /**
   * 단일 JSON파일 삭제
   */
  app.delete('/api/v1/json', (req, res) => {
    try {
      const { path } = req.body;
      if (!path) throw new Error('Unvalid Parameters');

      $fs.rmSync($path.join(root, path, '/index.json'));

      const fullPath = $path.join(root, path);
      cleanFolder(fullPath);

      function cleanFolder(path) {
        const files = $fs.readdirSync(path);

        if (path === root || files.length > 0) return;
        $fs.rmdirSync(path);

        const parentPath = $path.resolve(path, '..');
        cleanFolder(parentPath);
      }

      res.send({
        code: 200,
        message: 'Ok',
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  });
};

module.exports = json;
