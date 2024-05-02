import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import { DialogContentContext } from '~/features/Dialogs';
import Monaco from '~/features/Monaco';

import { getApiList } from '~/api';
import schemas from '~/schema';

import type { editor } from 'monaco-editor';

const Contents = ({ path }: { path: string }) => {
  const { data, isPending } = getApiList(path);

  const setDatas = useContext(DialogContentContext);

  setDatas && setDatas(data);

  return (
    <>
      <Typography>{path}</Typography>
      <Monaco
        value={JSON.stringify(data, null, 2)}
        height={600}
        schemas={schemas}
      />
    </>
  );
};

export default Contents;
