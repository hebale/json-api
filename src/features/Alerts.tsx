import { useContext } from 'react';
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
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <TransitionGroup>
        {alerts.map((alert: AlertProps) => {
          const { id = new Date().getTime(), type, message, timer } = alert;

          setTimeout(() => {
            close(id);
          }, timer ?? 3500);

          return (
            <Collapse key={id}>
              <Alert
                severity={type ?? 'info'}
                onClose={() => close(id)}
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  whiteSpace: 'pre-wrap',
                  // boxShadow: '6px 6px 0 -2px rgba(0, 0, 0, 0.08)',
                }}
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
