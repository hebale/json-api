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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DialogStatusContext, DialogDispatchContext, } from "~/contexts/DialogContext";
var Dialogs = function () {
    var dialogs = useContext(DialogStatusContext);
    var close = useContext(DialogDispatchContext).close;
    return (_jsx(_Fragment, { children: dialogs.map(function (dialog) {
            var _a = dialog.id, id = _a === void 0 ? new Date().getTime() : _a, open = dialog.open, title = dialog.title, content = dialog.content, _b = dialog.actions, actions = _b === void 0 ? [] : _b, rest = __rest(dialog, ["id", "open", "title", "content", "actions"]);
            return (_jsxs(Dialog, __assign({ open: open, onClose: function () { return close(id); } }, rest, { children: [_jsx(DialogTitle, { children: title }), _jsx(IconButton, { sx: {
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }, onClick: function () { return close(id); }, children: _jsx(CloseIcon, {}) }), _jsx(DialogContent, { dividers: true, children: content }), actions.length && (_jsx(DialogActions, { sx: { py: 2 }, children: actions.map(function (action, index) {
                            var text = action.text, onClick = action.onClick, _a = action.closeAction, closeAction = _a === void 0 ? true : _a, rest = __rest(action, ["text", "onClick", "closeAction"]);
                            return (_jsx(Button, __assign({ onClick: function () { } }, (closeAction && { onClick: function () { return close(id); } }), rest, { children: text }), "".concat(text, "_").concat(index)));
                        }) }))] }), id));
        }) }));
};
export default Dialogs;
