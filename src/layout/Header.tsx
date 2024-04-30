import React from "react";
import { Stack, Box } from "@mui/material";

import type { HeaderProps } from "~/types/layout";

const test = React.createElement("mark", {}, "코드");

const Header = ({ left, right }: HeaderProps) => {
  return (
    <Stack
      id="header"
      component="header"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {left && <Box>{left}</Box>}
      {right && <Box>{right}</Box>}
      {/* <Box>{["테스트", test, " 입니다"]}</Box> */}
    </Stack>
  );
};

export default Header;
