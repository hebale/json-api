import React from 'react';
import { Button } from '@mui/material';

import useAlert from '~/hooks/useAlert';
import useDialog from '~/hooks/useDialog';

import Contents from './Contents';
import { postApi } from '~/api';

const CreateApiDialog = ({ title }: { title: string }) => {
  const { openAlert } = useAlert();
  const { openDialog } = useDialog();
  const { mutate } = postApi();

  const open = () => {
    openDialog({
      title: title,
      content: <Contents />,
      actions: [
        {
          text: '등록',
          variant: 'contained',
          onAction: async (closeFn, contents) => {
            const data = JSON.parse(contents);

            mutate(
              { path: data.path, data },
              {
                onSuccess: () => {
                  openAlert({
                    type: 'success',
                    message: '등록 되었습니다.',
                  });
                  closeFn();
                },
                onError: () => {
                  openAlert({
                    type: 'error',
                    message: '등록중 오류가 발생했습니다.',
                  });
                },
              }
            );
          },
        },
        {
          text: '취소',
          onAction: (closeFn) => closeFn(),
        },
      ],
    });
  };

  return (
    <Button variant="contained" onClick={open}>
      {title}
    </Button>
  );
};

export default CreateApiDialog;
