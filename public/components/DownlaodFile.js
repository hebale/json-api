var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
var DownloadFile = function (_a) {
    var url = _a.url, _b = _a.fileName, fileName = _b === void 0 ? "api_json_".concat(new Date().getTime()) : _b, rest = __rest(_a, ["url", "fileName"]);
    var onClick = function (e) {
        e.preventDefault();
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "".concat(fileName));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (_jsx(Tooltip, { title: "JSON download", placement: "top", arrow: true, children: _jsx(IconButton, __assign({ onClick: onClick }, rest, { children: _jsx(DownloadIcon, {}) })) }));
};
export default DownloadFile;
