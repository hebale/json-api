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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Tooltip, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
var HiddenInput = styled("input")({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 1,
    height: 1,
    clip: "rect(0, 0, 0, 0)",
    clipPath: "inset(50%)",
    overflow: "hidden",
    whiteSpace: "nowrap",
});
var UploadFile = function (_a) {
    var extensions = _a.extensions, rest = __rest(_a, ["extensions"]);
    var inputRef = useRef(null);
    var onChange = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(URL.createObjectURL(file));
        reader.onload = function () {
            console.log(reader.result);
            // throw "is error";
        };
        reader.onerror = function () {
            console.log("i cacth error");
        };
    };
    return (_jsx(Tooltip, { ref: inputRef, title: "JSON download", placement: "top", arrow: true, children: _jsxs(IconButton, __assign({ component: "label", tabIndex: -1 }, rest, { children: [_jsx(UploadIcon, {}), _jsx(HiddenInput, { type: "file", onChange: onChange })] })) }));
};
export default UploadFile;
