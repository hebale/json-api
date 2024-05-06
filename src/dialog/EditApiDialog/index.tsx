import React from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import useAlert from '~/hooks/useAlert';
import useModal from '~/hooks/useModal';
import useDialog from '~/hooks/useDialog';

import Contents from './Contents';
import { deleteJson } from '~/api';

const EditApiDialog = ({ path }: { path: string }) => {
  const { openAlert } = useAlert();
  const { openModal } = useModal();
  const { openDialog } = useDialog();

  const open = () => {
    openDialog({
      title: 'JSON 수정',
      content: <Contents path={path} />,
      actions: [
        {
          text: '삭제',
          color: 'error',
          variant: 'contained',
          onAction: async (closeFn) => {
            const flag = await openModal({
              type: 'confirm',
              title: '알림',
              message: '삭제하시겠습니까?',
            });

            if (flag) {
              const response = await deleteJson({ path });

              if (!response) {
                return openAlert({
                  type: 'error',
                  message: '삭제중 오류가 발생했습니다.',
                });
              }

              openAlert({
                type: 'success',
                message: '삭제 되었습니다.',
              });

              closeFn();
            }
          },
        },
        {
          text: '저장',
          onAction: (closeFn, contents) => {
            console.log(contents);
          },
        },
        {
          text: '새로고침',
          onAction: (closeFn) => closeFn(),
        },
        {
          text: '닫기',
          onAction: (closeFn) => closeFn(),
        },
      ],
    });
  };

  return (
    <IconButton onClick={open} disableRipple={true}>
      <Stack sx={{ alignItems: 'center' }}>
        <SettingsIcon />
        <Typography sx={{ fontSize: '0.6rem' }}>Edit</Typography>
      </Stack>
    </IconButton>
  );
};

export default EditApiDialog;
