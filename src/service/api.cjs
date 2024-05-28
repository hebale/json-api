const $fs = require('fs');
const $path = require('path');
const { glob } = require('glob');
const root = $path.resolve(process.cwd(), './src/json');

const statusMessage = {
  200: 'Ok',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  505: 'HTTP Version Not Supported',
};
const clients = [];

const api = ({ app }) => {
  app.get('/sse', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });

    clients.push(res);
  });
  app.use('/*', (req, res) => {
    try {
      const filePath = glob.sync(`${$path.join(root, req.baseUrl)}/index.json`);

      if (!filePath.length) throw { code: 404, message: statusMessage['404'] };

      const response = $fs.readFileSync(
        $path.resolve(process.cwd(), filePath[0]),
        {
          encoding: 'utf-8',
          flag: 'r',
        }
      );

      const json = JSON.parse(response);
      const settings = json.methods[req.method];

      if (!settings) throw { code: 405, message: statusMessage['405'] };

      const { headers } = json;
      const { delay, status, code } = settings;
      const data = code?.isActive
        ? eval(code.value)(req, json.response)
        : json.response;

      for (let i = 0; i < headers.length; i++) {
        if (headers[i].isActive) {
          const { key, value } = headers[i];
          res.append(key, value);
        }
      }

      clients.forEach((client) => {
        const logData = {
          ip: req.ip,
          method: req.method,
          path: req.baseUrl,
          request: req.body,
          response: data ?? [],
        };

        client.write(
          `id: ${new Date().getTime()}\nevent: log\ndata: ${JSON.stringify(
            logData
          )}\n\n`
        );
      });

      setTimeout(() => {
        res.status(status).send({
          status,
          message: statusMessage[status],
          ...(status === 200 && { data: data ?? [] }),
        });
      }, delay);
    } catch (err) {
      res.status(err.code).send(err);
    }
  });
};

module.exports = api;
