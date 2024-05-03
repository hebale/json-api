import React, { useContext } from 'react';
import { AccordionDetails, Divider } from '@mui/material';
import { ApiContext } from '~/components/ListItem';

import Methods from './Methods';
import Response from './Response';

import { ApiData } from '~/types/components';

const Details = () => {
  const { path, headers, methods, response } = useContext(
    ApiContext
  ) as ApiData;

  return (
    <AccordionDetails>
      {/* <Headers /> */}
      <Divider sx={{ my: 1 }} />
      <Methods {...{ path: path as string, headers, methods }} />
      <Divider sx={{ my: 1 }} />
      <Response
        {...{ path: path as string }}
        value={JSON.stringify(response, null, 2)}
        height={450}
      />
    </AccordionDetails>
  );
};

export default Details;
