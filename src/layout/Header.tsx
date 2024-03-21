import { Stack, Button } from "@mui/material";

import ApiSearchBar from "@Components/ApiSearchBar";

const Header = () => {
  return (
    <Stack
      component="header"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ py: 4 }}
    >
      <ApiSearchBar />
      <Button variant="contained">CREATE</Button>
    </Stack>
  );
};

export default Header;
