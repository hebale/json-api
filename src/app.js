const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

const Logger = require("./logger/index.js");
const Loader = require("./loaders/index.js");
const Service = require("./service/index.js");

dotenv.config({ path: path.join(__dirname, "../", ".env") });

const app = express();
const port = process.env.DEV_SERVER_PORT;

Loader({ app });
Service({ app });

const onServer = () => {
  app
    .listen(port, () => {
      Logger.info(`>>>>>>>>>>
        Server listening on port:${process.env.DEV_SERVER_PORT}
        >>>>>>>>>>
      `);

      // Logger.info("hello world");
      // Logger.error("hello world");
      // Logger.warn("hello world");
      // Logger.debug("hello world");
      // Logger.verbose("hello world");
      // Logger.silly("hello world");
    })
    .on("error", (err) => {
      process.exit(1);
    });
};

onServer();
