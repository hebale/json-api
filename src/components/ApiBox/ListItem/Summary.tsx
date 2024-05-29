import React, { useContext, useCallback } from 'react';
import { Stack, Box, AccordionSummary, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { highlightMarker } from '~/utils';
import { ApiContext } from '~/components/ApiBox/ListItem';
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
        '.MuiAccordionSummary-content': {
          m: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '.MuiAccordionSummary-content.Mui-expanded': {
          m: 0,
          minHeight: 0,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: '70%',
          px: 1.5,
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        {onMarkedPath()}
        <Box sx={{ ml: 1 }}>
          <CopyButton
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
