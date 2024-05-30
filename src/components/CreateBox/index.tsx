import React, { useRef } from 'react';
import { Paper, Stack, Button, Typography } from '@mui/material';
import RefreshButton from '~/features/RefreshButton';
import Form from './Form';
import type { EventRef } from './Form';

const CreateBox = () => {
  const evnetRef = useRef<EventRef | null>(null);

  const onRefreshForm = () => evnetRef.current?.resetFormData();

  const onCreateApi = () => {
    console.log(evnetRef.current?.getFormData());
  };

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center">
        <Typography>Api 생성</Typography>
        <RefreshButton onClick={onRefreshForm} />
        <Button variant="contained" onClick={onCreateApi}>
          생성
        </Button>
      </Stack>

      <Form ref={evnetRef} />
    </Paper>
  );
};

export default CreateBox;
