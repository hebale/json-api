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
import { jsx as _jsx } from "react/jsx-runtime";
import ApiListItem from "../ApiListItem";
var datas = [
    {
        path: "/user",
        methods: ["POST", "GET"],
        delay: [0, 100, 200, 0],
        status: [200, 401, 403, 500],
        data: "{\n      \"bool\": false,\n    }",
    },
    {
        path: "/admin",
        methods: ["POST", "GET", "PATCH", "DELETE"],
        delay: [100, 200, 0, 0],
        status: [200, 401, 403, 500],
        data: "{\n      \"bool\": true,\n    }",
    },
];
var ApiListGroup = function () {
    return datas.map(function (data) { return _jsx(ApiListItem, __assign({}, data), data.path); });
};
export default ApiListGroup;
