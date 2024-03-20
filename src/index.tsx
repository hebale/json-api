import React from "react";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";

import Header from "@Layout/Header";
import Body from "@Layout/Body";
import "@Assets/style.scss";

if (document.querySelector("#app") !== null) {
  createRoot(document.querySelector("#app") as HTMLElement).render(
    <Container maxWidth="md">
      <Header />
      <Body />
    </Container>
  );
}
