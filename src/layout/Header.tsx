import React from "react";
import { Stack } from "@mui/material";

import ApiSearchBar from "~/components/ApiSearchBar";
import DownlaodFile from "~/components/DownlaodFile";

import CreateApiDialog from "~/dialog/CreateApiDialog";

const Header = () => {
  return (
    <Stack
      component="header"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ py: 4 }}
    >
      <ApiSearchBar />
      <CreateApiDialog title={"API 생성"} />
    </Stack>
  );
};

export default Header;
