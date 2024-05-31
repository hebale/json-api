import React from 'react';
import { Stack, Box } from '@mui/material';
import type { ReactElement } from 'react';

export type HeaderProps = {
  left?: ReactElement;
  right?: ReactElement;
};

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
    </Stack>
  );
};

export default Header;
