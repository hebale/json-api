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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Button, Typography, } from "@mui/material";
var methodColor = {
    POST: "#49cc90",
    GET: "#61affe",
    PATCH: "#fca130",
    DELETE: "#f93e3e",
};
var inputStyle = {
    m: 1,
    width: "80px",
    height: "30px",
    background: "#fff",
};
var ResponseController = function (_a) {
    var methods = _a.methods, delay = _a.delay, status = _a.status, onUpdateData = _a.onUpdateData;
    var onChangeDelay = function (event, index) {
        onUpdateData("delay", __spreadArray(__spreadArray(__spreadArray([], delay.slice(0, index), true), [
            +event.target.value
        ], false), delay.slice(index + 1), true));
    };
    var onChnageStatus = function (event, index) {
        return console.log(event.target.value);
    };
    return methods.map(function (method, index) { return (_jsxs(Stack, { flexDirection: "row", justifyContent: "space-between", alignItems: "center", sx: __assign(__assign({ p: 1, px: 2 }, (index > 0 && { borderTop: "1px solid #ddd" })), { background: "#fafafa" }), children: [_jsx(Typography, { sx: {
                    fontSize: "14px",
                    fontWeight: 600,
                }, children: method }), _jsxs(Stack, { flexDirection: "row", alignItems: "center", children: [_jsx(Button, { variant: "contained", size: "small", sx: {
                            mr: 2,
                            height: "30px",
                            fontSize: "12px",
                        }, children: "exec" }), _jsxs(FormControl, { variant: "outlined", size: "small", sx: __assign({}, inputStyle), children: [_jsx(InputLabel, { children: "delay" }), _jsx(OutlinedInput, { type: "number", label: "delay", value: delay[index], onChange: function (event) { return onChangeDelay(event, index); }, inputProps: {
                                    min: 0,
                                    step: 100,
                                }, sx: {
                                    height: "30px",
                                } })] }), _jsxs(FormControl, { variant: "outlined", size: "small", sx: __assign({}, inputStyle), children: [_jsx(InputLabel, { children: "status" }), _jsxs(Select, { label: "status", size: "small", value: status[index], onChange: function (event) { return onChnageStatus(event, index); }, sx: { height: "30px" }, children: [_jsx(MenuItem, { value: 200, children: "200" }), _jsx(MenuItem, { value: 401, children: "401" }), _jsx(MenuItem, { value: 403, children: "403" }), _jsx(MenuItem, { value: 404, children: "404" }), _jsx(MenuItem, { value: 500, children: "500" }), _jsx(MenuItem, { value: 505, children: "505" })] })] })] })] }, method)); });
};
export default ResponseController;
