import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";
import ModalProvider from "~/contexts/DialogContext";
import Header from "~/layout/Header";
import Body from "~/layout/Body";
import "~/assets/style.scss";
if (document.querySelector("#app") !== null) {
    createRoot(document.querySelector("#app")).render(_jsx(ModalProvider, { children: _jsxs(Container, { maxWidth: "md", children: [_jsx(Header, {}), _jsx(Body, {})] }) }));
}
