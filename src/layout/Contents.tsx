import React from 'react';
import { Stack, Box } from '@mui/material';

import { ReactElement } from 'react';
import type { ContentsProps } from '~/types/layout';

const Contents = ({ head, body }: ContentsProps) => {
  return (
    <Stack id="contents">
      {head && <Box>{head}</Box>}
      {(body as ReactElement[]).length > 0 ? (
        <Box>{body}</Box>
      ) : (
        <Box>검색결과가 없습니다.</Box>
      )}
    </Stack>
  );
};

export default Contents;
