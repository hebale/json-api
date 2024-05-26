import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DialogContentContext } from '~/features/Dialogs';
import Monaco from '~/features/Monaco';
import { getApi } from '~/api';
import schemas from '~/schema';

const Contents = ({ path }: { path: string }) => {
  const { data, isPending } = getApi(path);
  const setDatas = useContext(DialogContentContext);

  useEffect(() => {
    setDatas && setDatas(data);
  }, [setDatas]);

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
