import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FormGroup, FormControl, OutlinedInput, InputLabel, } from "@mui/material";
import CodeEditor from "~/components/CodeEditor";
var CreateForm = function () {
    return (_jsxs(_Fragment, { children: [_jsxs(FormGroup, { children: [_jsxs(FormControl, { size: "small", children: [_jsx(InputLabel, { children: "path" }), _jsx(OutlinedInput, { label: "path", value: "/user/info" })] }), _jsxs(FormControl, { size: "small", children: [_jsx(InputLabel, { children: "method" }), _jsx(OutlinedInput, { label: "method" })] })] }), _jsx(CodeEditor, { data: "{\n          \"name\": \"\uC724\uC885\uADDC\",\n          \"age\": 32,\n          \"data\": false \n        }" })] }));
};
export default CreateForm;
