import { Stack } from "@mui/material";

import ApiSearchBar from "@Components/ApiSearchBar";

const Header = () => {
  return (
    <Stack component="header">
      <h2>{/*Json Sever */}</h2>
      <ApiSearchBar />
    </Stack>
  );
};

export default Header;
