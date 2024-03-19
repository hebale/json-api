import React from "react";

import Header from "~/layout/Header";
import Body from "~/layout/Body";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Container maxWidth="md">
      <Header />
      <Body />
    </Container>
  );
};

export default App;
