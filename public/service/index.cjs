var jsonService = require("./jsonService.cjs");
var errorService = require("./errorService.cjs");
var service = function (_a) {
    var app = _a.app;
    app
        .get("/", function (req, res) {
        res.type("html");
        res.sendFile(path.resolve(__dirname, "../index.html"));
    })
        .on("error", function (err) {
        process.exit(1);
    });
    jsonService({ app: app });
    errorService({ app: app });
};
module.exports = service;
export {};
