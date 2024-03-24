var path = require("path");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var webpack = require("webpack");
var middleware = require("webpack-dev-middleware");
var compiler = webpack(require("../config/webpack.config.js"));
var loader = function (_a) {
    var app = _a.app;
    app.use(cors({
        origin: "http://localhost",
        credentials: true,
    }));
    app.use(middleware(compiler));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "../public")));
};
module.exports = loader;
export {};
