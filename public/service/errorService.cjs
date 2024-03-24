var errorService = function (_a) {
    var app = _a.app;
    app.use(function (req, res, next) {
        res.status(404).send("Sorry can not find that!");
    });
    app.use(function (err, req, res, next) {
        res.status(500).send("Something broke!");
    });
};
module.exports = errorService;
export {};
