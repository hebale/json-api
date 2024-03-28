import React from "react";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";

import AlertProvider from "~/contexts/AlertContext";
import ModalProvider from "./contexts/ModalContext";
import DialogProvider from "~/contexts/DialogContext";

import Header from "~/layout/Header";
import Body from "~/layout/Body";
import "~/assets/style.scss";

if (document.querySelector("#app") !== null) {
  createRoot(document.querySelector("#app") as HTMLElement).render(
    <AlertProvider>
      <ModalProvider>
        <DialogProvider>
          <Container maxWidth="md">
            <Header />
            <Body />
          </Container>
        </DialogProvider>
      </ModalProvider>
    </AlertProvider>
  );
}
