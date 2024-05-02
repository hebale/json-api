import React, { useContext } from 'react';
import { AccordionDetails } from '@mui/material';
import { ApiContext } from '~/components/ListItem';

import Methods from './Methods';
import Editor from './Editor';

import { ApiData } from '~/types/components';

const Details = () => {
  const { path, headers, methods, response } = useContext(
    ApiContext
  ) as ApiData;

  return (
    <AccordionDetails>
      <Methods {...{ path: path as string, headers, methods }} />
      <Editor
        {...{ path: path as string }}
        value={JSON.stringify(response, null, 2)}
        height={450}
      />
    </AccordionDetails>
  );
};

export default Details;
