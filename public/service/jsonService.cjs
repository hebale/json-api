var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require("fs");
var path = require("path");
var glob = require("glob").glob;
var hasDir = function (path) {
    try {
        return fs.lstatSync(path);
    }
    catch (err) {
        return false;
    }
};
var root = path.resolve(process.cwd(), "./src/json");
var getBasePath = function (_path) {
    return path.resolve(process.cwd(), "./src/json".concat(_path));
};
var jsonService = function (_a) {
    var app = _a.app;
    app.get("/api/v1/all-jsons", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var files, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, glob("".concat(process.cwd(), "/src/json/**/*.json"))];
                case 1:
                    files = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/v1/regist", function (req, res) {
        try {
            var _a = req.body, name_1 = _a.name, data_1 = _a.data;
            var basePath = getBasePath(name_1);
            if (!hasDir(basePath)) {
                fs.mkdirSync(basePath, { recursive: true });
            }
            fs.writeFileSync("".concat(basePath, "/index.json"), JSON.stringify(data_1));
            res.send({
                code: 200,
                message: "json is created!",
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    //
    app.get("/api/v1/download", function (req, res) {
        try {
            var name_2 = req.query.name;
            res.sendFile("".concat(root).concat(name_2, "\\index.json"));
        }
        catch (err) {
            res.send({
                code: "000",
                message: "file download error!",
            });
        }
    });
    //
    //
    //
    //
    //
    //
    //
    //
    //
    app.use("/api/v1/jsons", function (req, res) {
        try {
            var query = req.query, method = req.method, headers_1 = req.headers, body = req.body;
            switch (method) {
                case "GET":
                    var jsonFilesPath = glob
                        .sync("".concat(root, "/**/*.json"))
                        .map(function (filePath) { return path.normalize("../../".concat(filePath.toString())); });
                    // const jsonFilesPath = fs
                    //   .readdirSync(`${process.cwd()}/src/json/`)
                    //   .filter((allFilesPaths) => allFilesPaths.match(/\.json$/) !== null);
                    console.log(jsonFilesPath);
                    res.send({
                        code: 200,
                        message: "successed",
                        data: JSON.parse(jsonFilesPath),
                    });
            }
        }
        catch (err) {
            console.log(err);
            res.send({
                code: 500,
                message: "server error",
                err: err,
            });
        }
    });
    app.get("/api/db", function (req, res) {
        try {
            var readPath = path.resolve(__dirname, "../db".concat(req.query.name, "/index.json"));
            var data_2 = fs.readFileSync(readPath);
            res.send({
                code: 200,
                date: JSON.parse(data_2),
            });
        }
        catch (err) {
            res.send(err);
        }
    });
    app.post("/api/db", function (req, res) {
        try {
            if (!req.body.name)
                throw { code: "000", message: "db name is not defined!" };
            var createPath = path.resolve(__dirname, "../db".concat(req.body.name));
            if (!hasDir(createPath)) {
                fs.mkdirSync(createPath, { recursive: true });
            }
            fs.writeFileSync("".concat(createPath, "/index.json"), JSON.stringify(req.body));
            res.send({
                code: 200,
                message: "json is created!",
            });
        }
        catch (err) {
            res.send(err);
        }
    });
    app.patch("/api/db", function (req, res) {
        try {
            var updatePath = path.resolve(__dirname, "../db".concat(req.body.name));
            if (!hasDir)
                throw { code: "0000", message: "Db is not " };
            fs.writeFileSync("".concat(updatePath, "/index.json"), JSON.stringify(req.body));
            res.send({
                code: 200,
                message: "file is updated",
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    app.delete("/api/db", function (req, res) {
        try {
            if (!req.body.name)
                throw { code: "000", message: "db name is not defined!" };
            var deletePath = path.resolve(__dirname, "../db".concat(req.body.name));
            fs.rmdirSync(deletePath, {
                recursive: true,
                force: true,
            });
            res.send({
                code: 200,
                message: "db is deleted",
            });
        }
        catch (err) {
            console.log(err);
        }
    });
};
module.exports = jsonService;
export {};
