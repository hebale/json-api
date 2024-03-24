var serviceRoute = require("./serviceRoute.cjs");
var errorRoute = require("./errorRoute.cjs");
var Service = function (_a) {
    var app = _a.app;
    app
        .get("/", function (req, res) {
        res.type("html");
        res.sendFile(path.resolve(__dirname, "../index.html"));
    })
        .on("error", function (err) {
        process.exit(1);
    });
    serviceRoute({ app: app });
    errorRoute({ app: app });
};
module.exports = Service;
export {};
