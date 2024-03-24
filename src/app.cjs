const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const figlet = require("figlet");

const loader = require("./loaders/index.cjs");
const service = require("./service/index.cjs");

dotenv.config({ path: path.join(__dirname, "../", ".env") });

const app = express();
const port = process.env.SERVER_PORT;

loader({ app });
service({ app });

const onServer = () => {
  app
    .listen(port, () => {
      console.info(figlet.textSync("JSON-API", { font: "Slant" }));
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
};

onServer();
