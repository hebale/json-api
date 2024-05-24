import React, { useContext } from 'react';
import { Box, Alert, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import {
  AlertStatusContext,
  AlertDispatchContext,
} from '~/contexts/AlertContext';
import type { AlertProps } from '~/types/features';

const Alerts = () => {
  const alerts = useContext(AlertStatusContext);
  const { close } = useContext(AlertDispatchContext);

  return (
    <Box
      sx={{
        zIndex: 1600,
        position: 'fixed',
        top: 0,
        right: 0,
      }}
    >
      <TransitionGroup>
        {alerts.map((alert: AlertProps) => {
          const { id = new Date().getTime(), type, message, timer } = alert;

          setTimeout(() => {
            close(id);
          }, timer ?? 2000);

          return (
            <Collapse key={id}>
              <Alert
                severity={type ?? 'info'}
                onClose={() => close(id)}
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {message}
              </Alert>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </Box>
  );
};

export default Alerts;
