import React from "react";
import { Stack } from "@mui/material";

import SearchBar from "~/components/SearchBar";

const Header = () => {
  return (
    <Stack component="header">
      <h2>Json-Server</h2>
      <SearchBar />
    </Stack>
  );
};

export default Header;
