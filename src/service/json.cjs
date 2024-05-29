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
const getJsonData = (path) => {
  const response = $fs.readFileSync(`${path}/index.json`, {
    encoding: 'utf-8',
    flag: 'r',
  });
  return JSON.parse(response);
};
const setJsonData = (path, json) => {
  $fs.writeFileSync(
    $path.join(path, '/index.json'),
    JSON.stringify(json, null, 2)
  );
};
const removeEmptyFolder = (path) => {
  const files = $fs.readdirSync(path);

  if (path === root || files.length > 0) return;
  $fs.rmdirSync(path);

  const parentPath = $path.resolve(path, '..');
  removeEmptyFolder(parentPath);
};
const mergeShallowData = (a, b) => {
  if (typeof a === 'object') {
  }
};

const json = ({ app }) => {
  app.get('/api/v1/all', async (_, res) => {
    try {
      const filePaths = $glob.sync(`${root}/**/*.json`, { nodir: true });
      const allJsons = [];

      filePaths.forEach((filePath) => {
        // const basePath = $path.resolve(process.cwd(), `./src/json${path}`);
        const response = $fs.readFileSync(
          $path.resolve(process.cwd(), filePath),
          {
            encoding: 'utf-8',
            flag: 'r',
          }
        );
        const data = JSON.parse(response);

        allJsons.push(data);
      });

      res.send({
        code: 200,
        message: 'Ok',
        data: allJsons,
      });
    } catch (err) {
      res.status(500).send({
        code: 500,
        message: 'Internal Server Error',
        err,
      });
    }
  });

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
   * JSON METHODS API
   */
  app.use('/api/v1/json/:id', (req, res) => {
    try {
      const { path, key, data } = req.body;
      const basePath = getBasePath(path);
      const jsonData = getJsonData(basePath);
      const id = req.params.id;
      const isDataTypeArray = Array.isArray(jsonData[id]);

      switch (req.method) {
        case 'POST':
        case 'PUT':
        case 'PATCH':
          setJsonData(basePath, {
            ...jsonData,
            [id]: (() => {
              if (!key) return JSON.parse(data);
              return isDataTypeArray
                ? [
                    ...jsonData[id].slice(0, key),
                    ...(req.method === 'POST' ? data : [data]),
                    ...jsonData[id].slice(key + (req.method !== 'POST')),
                  ]
                : { ...jsonData[id], [key]: data };
            })(),
          });
          break;

        case 'DELETE':
          setJsonData(basePath, {
            ...jsonData,
            [id]: isDataTypeArray
              ? [...jsonData[id].slice(0, key), ...jsonData[id].slice(key + 1)]
              : (() => {
                  delete jsonData[id][key];
                  return jsonData[id];
                })(),
          });
          break;
        default:
          res.status(400).send({
            code: 400,
            message: 'Bad Request',
          });
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

  /**
   * JSON API
   */
  app.use('/api/v1/json', (req, res) => {
    try {
      const { path, data } = req.body;
      const basePath = getBasePath(path);

      switch (req.method) {
        case 'GET':
          const jsonData = getJsonData(basePath);
          res.send({
            code: 200,
            message: 'Ok',
            data: jsonData,
          });
          break;

        case 'POST':
        case 'PUT':
          if (!hasDir(basePath)) {
            $fs.mkdirSync(basePath, { recursive: true });
          }
          setJsonData(basePath, data);
          break;

        case 'DELETE':
          $fs.rmSync(`${basePath}/index.json`);
          removeEmptyFolder(basePath);
          break;
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
