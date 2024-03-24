var path = require("path");
var express = require("express");
var dotenv = require("dotenv");
var figlet = require("figlet");
var loader = require("./loaders/index.cjs");
var service = require("./service/index.cjs");
dotenv.config({ path: path.join(__dirname, "../", ".env") });
var app = express();
var port = process.env.DEV_SERVER_PORT;
loader({ app: app });
service({ app: app });
var onServer = function () {
    app
        .listen(port, function () {
        console.info(figlet.textSync("JSON-API", { font: "Slant" }));
    })
        .on("error", function (err) {
        console.error(err);
        process.exit(1);
    });
};
onServer();
export {};
