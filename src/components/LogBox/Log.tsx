import React, { useState } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';

export type LogProps = {
  ip: string;
  path: string;
  method: string;
  request: any;
  response: any;
  timeStamp: number;
};

const Log = ({ data }: { data: LogProps }) => {
  const [open, setOpen] = useState(false);
  const { method, path, request, response, timeStamp } = data;

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>
          [{method}] {path} {timeStamp}
        </Typography>

        <Button onClick={() => setOpen((prev) => !prev)}>more</Button>
      </Stack>
      {open && (
        <Stack>
          <Box>request: {JSON.stringify(request)}</Box>
          <Box>response: {JSON.stringify(response)}</Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Log;
