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
import { useContext } from "react";
import { DialogDispatchContext } from "~/contexts/DialogContext";
var useDialog = function () {
    var _a = useContext(DialogDispatchContext), open = _a.open, close = _a.close;
    var openDialog = function (dialog) {
        return open(__assign({ id: new Date().getTime(), open: true }, dialog));
    };
    var closeDialog = function (id) { return close(id); };
    return { openDialog: openDialog, closeDialog: closeDialog };
};
export default useDialog;
