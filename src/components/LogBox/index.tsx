import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';

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
    <div>
      <p>로그</p>
      {logs.map((log, index) => (
        <Log key={index} data={log} />
      ))}
    </div>
  );
};

export default LogBox;
