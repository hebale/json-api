import React, { useState, useEffect } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';

export type LogProps = {
  ip: string;
  path: string;
  method: string;
  request: any;
  response: any;
};

const Log = ({ data }: { data: LogProps }) => {
  const [open, setOpen] = useState(false);
  const { method, path, request, response } = data;

  console.log(data);

  return (
    <Stack>
      <Stack>
        <Typography>
          [{method}] {path}
        </Typography>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? 'detail' : 'simple'}
        </Button>
      </Stack>
      {open && (
        <Stack>
          <Box>{JSON.stringify(request)}</Box>
          <Box>{JSON.stringify(response)}</Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Log;
