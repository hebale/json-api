import React from "react";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";

import ModalProvider from "~/contexts/DialogContext";
import AlertProvider from "~/contexts/AlertContext";

import Header from "~/layout/Header";
import Body from "~/layout/Body";
import "~/assets/style.scss";

if (document.querySelector("#app") !== null) {
  createRoot(document.querySelector("#app") as HTMLElement).render(
    <AlertProvider>
      <ModalProvider>
        <Container maxWidth="md">
          <Header />
          <Body />
        </Container>
      </ModalProvider>
    </AlertProvider>
  );
}
