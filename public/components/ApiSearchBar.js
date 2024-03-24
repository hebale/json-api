import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
var ApiSearchBar = function () {
    var _a = useState(""), searchText = _a[0], setSearchText = _a[1];
    var onChange = function (e) {
        return setSearchText(e.target.value);
    };
    var onKeyDown = function (e) {
        if (e.key === "Enter")
            doSearch();
    };
    var doSearch = function () {
        /* ~ contents search ~ */
        console.log("\"".concat(searchText, "\" search!"));
    };
    return (_jsx(FormControl, { variant: "outlined", size: "small", children: _jsx(OutlinedInput, { type: "text", placeholder: "api name", onChange: onChange, onKeyDown: onKeyDown, startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) }) }) }));
};
export default ApiSearchBar;
