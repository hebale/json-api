import React from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import useAlert from '~/hooks/useAlert';
import useModal from '~/hooks/useModal';
import useDialog from '~/hooks/useDialog';
import Contents from './Contents';
import { deleteApi } from '~/api';

const EditApiDialog = ({ title, path }: { title: string; path: string }) => {
  const { openAlert } = useAlert();
  const { openModal } = useModal();
  const { openDialog } = useDialog();
  const { mutate } = deleteApi();

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
              mutate(path, {
                onSuccess: () => {
                  openAlert({
                    type: 'success',
                    message: '삭제 되었습니다.',
                  });
                  closeFn();
                },
                onError: () => {
                  openAlert({
                    type: 'error',
                    message: '삭제중 오류가 발생했습니다.',
                  });
                },
              });
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
        <CodeIcon />
        <Typography sx={{ fontSize: '0.6rem' }}>
          {title ? title : 'Edit'}
        </Typography>
      </Stack>
    </IconButton>
  );
};

export default EditApiDialog;
