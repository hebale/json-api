import React, { useContext, useCallback } from 'react';
import { Stack, Box, AccordionSummary, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { highlightMarker } from '~/utils';
import { ApiContext } from '~/components/ListItem';

import EditApiDialog from '~/dialog/EditApiDialog';
import CopyButton from '~/features/CopyButton';
import DownloadButton from '~/features/DownloadButton';

import useAlert from '~/hooks/useAlert';
import { ApiData } from '~/types/components';

const Summary = ({
  filter,
  onToggleExpand,
}: {
  filter: string;
  onToggleExpand: () => void;
}) => {
  const { path } = useContext(ApiContext) as ApiData;
  const { openAlert } = useAlert();

  const onMarkedPath = useCallback(
    () => highlightMarker(path, filter),
    [filter]
  );

  return (
    <AccordionSummary
      expandIcon={
        <IconButton onClick={onToggleExpand}>
          <ExpandMoreIcon />
        </IconButton>
      }
      sx={{
        py: 1,
        '.Mui-expanded': {
          m: 0,
        },
        '.MuiAccordionSummary-content': {
          m: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: '70%',
          px: 1.5,
          py: 1,
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 600,
          backgroundColor: '#f4f4f4',
        }}
      >
        {onMarkedPath()}
        <Box sx={{ ml: 'auto' }}>
          <CopyButton
            title="Copy"
            data={path}
            onSuccess={() =>
              openAlert({
                type: 'info',
                message: '클립보드에 복사 되었습니다.',
              })
            }
          />
        </Box>
      </Stack>
      <Stack flexDirection="row" sx={{ mr: 2 }}>
        <DownloadButton
          title="Down"
          url={`/api/v1/download?path=${path}`}
          fileName={`api${path.split('/').join('_')}`}
        />
        <EditApiDialog path={path} />
      </Stack>
    </AccordionSummary>
  );
};

export default Summary;
