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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Stack, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import Editor, { useMonaco, } from "@monaco-editor/react";
var defaultProps = {
    height: 300,
    defaultLanguage: "json",
    theme: "vs-dark",
};
var CodeEditor = function (_a) {
    var data = _a.data;
    var editorRef = useRef(null);
    var _b = useState(false), isChanged = _b[0], setIsChanged = _b[1];
    var monaco = useMonaco();
    useEffect(function () {
        if (monaco) {
            console.log("here", monaco);
        }
    }, [monaco]);
    var onMount = function (editor, monaco) {
        editorRef.current = editor;
    };
    var onCopyCode = function () {
        var _a, _b;
        navigator.clipboard.writeText((_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : "");
    };
    var onRefreshCode = function () {
        var _a;
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.setValue(data);
    };
    var onSaveCode = function () {
        var _a;
        console.log((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getValue());
    };
    var onChangeCode = function () {
        var _a;
        setIsChanged(data === ((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getValue()));
    };
    return (_jsxs(_Fragment, { children: [_jsx(Stack, { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", sx: { mt: 4, background: "#1e1e1e" }, children: _jsxs(ButtonGroup, { variant: "outlined", size: "small", sx: {
                        "> .MuiIconButton-root": { color: "#fff" },
                        "> .MuiIconButton-root.Mui-disabled": { color: "#ffffff55" },
                    }, children: [_jsx(Tooltip, { title: "Copy", placement: "top", arrow: true, children: _jsx(IconButton, { onClick: onCopyCode, children: _jsx(CopyAllIcon, {}) }) }), _jsx(Tooltip, { title: "Refresh", placement: "top", arrow: true, children: _jsx(IconButton, { onClick: onRefreshCode, children: _jsx(RefreshIcon, {}) }) }), _jsx(Tooltip, { title: "Save", placement: "top", arrow: true, children: _jsx(IconButton, { onClick: onSaveCode, disabled: isChanged, children: _jsx(SaveIcon, {}) }) })] }) }), _jsx(Editor, __assign({}, defaultProps, { value: data, onMount: onMount, onChange: onChangeCode, options: {
                    padding: {
                        top: 14,
                        bottom: 14,
                    },
                    fontSize: 13,
                    tabSize: 2,
                    minimap: { enabled: false },
                } }))] }));
};
export default CodeEditor;
