import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Stack, Accordion, AccordionSummary, AccordionDetails, IconButton, Tooltip, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ResponseController from "./ResponseController";
import CodeEditor from "./CodeEditor";
// dummy
var datas = [
    {
        path: "/user",
        methods: ["POST", "GET"],
        delay: [0, 100, 200, 0],
        status: [200, 401, 403, 500],
        data: {
            bool: false,
        },
    },
    {
        path: "/admin",
        methods: ["POST", "GET", "PATCH", "DELETE"],
        delay: [100, 200, 0, 0],
        status: [200, 401, 403, 500],
        data: {
            bool: true,
        },
    },
];
var onUpdateData = function (type, params) {
    console.log(type, params);
};
var ApiListItem = function (_a) {
    var path = _a.path, methods = _a.methods, delay = _a.delay, status = _a.status, data = _a.data;
    var _b = useState(true), expand = _b[0], setExpand = _b[1];
    var toggleAcordion = function () {
        setExpand(function (prev) { return !prev; });
    };
    var onCopyClipboard = function (path) {
        navigator.clipboard.writeText(path);
    };
    return (_jsxs(Accordion, { expanded: expand, sx: { border: "1px solid #eee" }, children: [_jsxs(AccordionSummary, { expandIcon: _jsx(IconButton, { onClick: toggleAcordion, children: _jsx(ExpandMoreIcon, {}) }), sx: {
                    py: 1,
                    ".Mui-expanded": {
                        m: 0,
                    },
                    ".MuiAccordionSummary-contentGutters": {
                        m: 0,
                        justifyContent: "space-between",
                    },
                }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: {
                            width: "70%",
                            px: 1.5,
                            py: 1,
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#fff",
                            backgroundColor: "#1e1e1e",
                        }, children: [path, _jsx(Tooltip, { title: "Copy", placement: "top", arrow: true, children: _jsx(IconButton, { sx: { p: 0, color: "#fff" }, onClick: function () { return onCopyClipboard(path); }, children: _jsx(CopyAllIcon, {}) }) })] }), _jsxs(Stack, { flexDirection: "row", children: [_jsx(Tooltip, { title: "JSON download", placement: "top", arrow: true, children: _jsx(IconButton, { onClick: toggleAcordion, children: _jsx(DownloadIcon, {}) }) }), _jsx(Tooltip, { title: "JSON upload", placement: "top", arrow: true, children: _jsx(IconButton, { onClick: toggleAcordion, children: _jsx(UploadIcon, {}) }) })] })] }), _jsxs(AccordionDetails, { children: [_jsx(ResponseController, { methods: methods, delay: delay, status: status, onUpdateData: onUpdateData }), _jsx(CodeEditor, { data: data })] })] }));
};
export default ApiListItem;
