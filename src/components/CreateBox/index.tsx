import React, { useRef } from 'react';
import { Paper, Stack, Button, Typography } from '@mui/material';
import RefreshButton from '~/features/RefreshButton';
import Form from './Form';
import useAlert from '~/hooks/useAlert';
import { getApiList, postApi } from '~/api';
import type { EventRef } from './Form';

const CreateBox = () => {
  const evnetRef = useRef<EventRef>();
  const { openAlert } = useAlert();
  const { mutate: createApi } = postApi();
  const { data: pathLists } = getApiList();

  const onRefreshForm = () => evnetRef.current?.resetFormData();

  const onCreateApi = () => {
    const formData = evnetRef.current?.getFormData();

    if (!formData) return;
    if (!formData.path) {
      openAlert({
        type: 'error',
        message: 'path를 입력해주세요.',
      });
    } else if (pathLists && pathLists?.indexOf(formData.path) > -1) {
      openAlert({
        type: 'error',
        message: '중복된 API가 존재합니다.',
      });
    } else {
      createApi({ data: formData });
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ mr: 'auto' }}>Api 생성</Typography>
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
