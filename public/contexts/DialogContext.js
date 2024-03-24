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
import { createContext, useState } from "react";
import Dialogs from "~/features/Dialogs";
export var DialogStatusContext = createContext([]);
export var DialogDispatchContext = createContext({
    open: function () { },
    close: function () { },
});
var DialogProvider = function (_a) {
    var children = _a.children;
    var _b = useState([]), dialogs = _b[0], setDialogs = _b[1];
    var dispatch = {
        open: function (dialog) {
            setDialogs(function (dialogs) { return __spreadArray(__spreadArray([], dialogs.filter(function (dialog) { return dialog.open; }), true), [
                dialog,
            ], false); });
        },
        close: function (id) {
            setDialogs(function (dialogs) {
                return dialogs.map(function (dialog) {
                    console.log(id, dialog);
                    if (dialog.id === id)
                        dialog.open = false;
                    return dialog;
                });
            });
        },
    };
    return (_jsx(DialogDispatchContext.Provider, { value: dispatch, children: _jsxs(DialogStatusContext.Provider, { value: dialogs, children: [children, _jsx(Dialogs, {})] }) }));
};
export default DialogProvider;
