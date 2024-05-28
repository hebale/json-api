import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

import Log from './Log';
import type { LogProps } from './Log';

const LogBox = () => {
  const [logs, setLogs] = useState<LogProps[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/sse`, { withCredentials: true });

    eventSource.addEventListener('open', (event) => {
      console.log('sse connected!!');
    });

    eventSource.addEventListener('log', (event) => {
      console.log(JSON.parse(event.data));
      setLogs((prev) => [...prev, JSON.parse(event.data)]);
    });

    eventSource.addEventListener('error', () => {
      console.error('is Error!!');
    });
  }, []);

  return (
    <Paper>
      {logs.map((log, index) => (
        <Log key={index} data={log} />
      ))}
    </Paper>
  );
};

export default LogBox;
