import React, { useContext } from 'react';
import { Paper } from '@mui/material';

import { LogContext } from '~/contexts/LogContext';

import Log from './Log';

const LogBox = () => {
  const logs = useContext(LogContext);

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      {logs.map((log, index) => (
        <Log key={index} data={log} />
      ))}
    </Paper>
  );
};

export default LogBox;
