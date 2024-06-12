import React, { useRef, useState, useContext, useCallback } from 'react';
import {
  Stack,
  Box,
  Input,
  AccordionSummary,
  Button,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { highlightMarker } from '~/utils';
import { ApiContext } from '~/components/ApiBox/ListItem';
import EditApiDialog from '~/dialog/EditApiDialog';
import CopyButton from '~/features/CopyButton';
import DownloadButton from '~/features/DownloadButton';
import useAlert from '~/hooks/useAlert';
import { patchApiPath } from '~/api';

import { ApiData } from '~/types/components';

const Summary = ({
  filter,
  onToggleExpand,
}: {
  filter: string;
  onToggleExpand: () => void;
}) => {
  const inputRef = useRef();
  const { path } = useContext(ApiContext) as ApiData;
  const [editable, setEditable] = useState(false);
  const { mutate } = patchApiPath();

  const { openAlert } = useAlert();

  const onMarkedPath = useCallback(() => {
    return highlightMarker(path, filter);
  }, [filter]);

  const onChangePath = () => {
    if (inputRef?.current) {
      mutate({ path, data: inputRef?.current.value });
    }
  };

  const onCopiedClipboard = () => {
    openAlert({
      type: 'info',
      message: '클립보드에 복사 되었습니다.',
    });
  };

  return (
    <AccordionSummary
      expandIcon={
        <IconButton onClick={onToggleExpand}>
          <ExpandMoreIcon />
        </IconButton>
      }
    >
      <Stack className="path-stack">
        <ButtonGroup size="medium">
          <CopyButton data={path} onSuccess={onCopiedClipboard} />

          {!editable ? (
            <Button variant="text" onClick={() => setEditable(true)}>
              {onMarkedPath()}
            </Button>
          ) : (
            <Input
              inputRef={inputRef}
              defaultValue={path}
              endAdornment={
                <>
                  <IconButton onClick={onChangePath}>
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditable(false)}>
                    <CancelIcon />
                  </IconButton>
                </>
              }
            />
          )}
        </ButtonGroup>
      </Stack>
      <Stack className="ctrl-stack">
        <DownloadButton
          title="Down"
          url={`/api/v1/json/download?path=${path}`}
          fileName={`api${path.split('/').join('_')}`}
        />
        <EditApiDialog path={path} />
      </Stack>
    </AccordionSummary>
  );
};

export default Summary;
