import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  ButtonGroup,
  FormLabel,
  Tooltip,
  IconButton,
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';

import CopyButton from '~/features/CopyButton';
import Monaco from '~/features/Monaco';

import useAlert from '~/hooks/useAlert';
import schemas from '~/schema';
import { getApiList, putJson } from '~/api';

import type { editor } from 'monaco-editor';

type EditorProps = {
  path: string;
  value: string;
  height?: number;
};

const Editor = ({ path, value, height }: EditorProps) => {
  const [origin, setOrigin] = useState<string>('');
  const [code, setCode] = useState<string>(value);
  const [validate, setValidate] = useState<
    Pick<editor.IMarker, 'endColumn' | 'endLineNumber' | 'message'>[]
  >([]);
  const [isChanged, setIsChanged] = useState(false);
  const { openAlert } = useAlert();

  const { data, isPending } = getApiList(path);

  // useEffect(() => {
  //   getJsonData();
  // }, []);

  useEffect(() => {
    setIsChanged(origin === code);
  }, [code]);

  // const getJsonData = async () => {
  //   const response = await getJson(path);

  //   delete response?.path; // 수정불가항목 미노출

  //   const strJson = JSON.stringify(response?.data, null, 2);

  //   setCode(strJson);
  //   setOrigin(strJson);
  // };

  const onSaveCode = async () => {
    if (validate.length) {
      return openAlert({
        type: 'error',
        message: validate
          .map(
            ({ endLineNumber, endColumn, message }) =>
              `${endLineNumber}:${endColumn} ${message}`
          )
          .join('\n'),
      });
    }

    const response = await putJson({
      path: path,
      response: { path: path, ...JSON.parse(code) },
    });

    if (response) {
      openAlert({ type: 'success', message: '저장 되었습니다' });
      getJsonData();
    } else {
      openAlert({
        type: 'error',
        message: '오류가 발생했습니다. 다시 시도해 주세요.',
      });
    }
  };

  const onValidateCode = (makers: editor.IMarker[]) => {
    setValidate(makers);
  };

  return (
    <Box>
      <FormLabel sx={{ fontSize: '14px' /* color: "#1976d2" */ }}>
        JSON Data
      </FormLabel>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ zIndex: -1, borderRadius: '4px 4px 0 0', background: '#1e1e1e' }}
      >
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            '> .MuiIconButton-root': { color: '#fff' },
            '> .MuiIconButton-root.Mui-disabled': { color: '#ffffff55' },
          }}
        >
          <CopyButton
            text={code}
            tooltip={{
              title: 'Copy',
              placement: 'top',
              arrow: true,
            }}
            onCopied={() =>
              openAlert({
                type: 'info',
                message: '클립보드에 복사 되었습니다.',
              })
            }
          />
          <Tooltip title="Refresh" placement="top" arrow>
            <IconButton onClick={() => getJsonData()} disabled={isChanged}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" placement="top" arrow>
            <IconButton onClick={onSaveCode} disabled={isChanged}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      <Monaco
        value={code}
        height={height}
        schemas={schemas}
        boxStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onChange={(data) => setCode(data ?? '')}
        onValidate={(makers) => onValidateCode(makers)}
      />
    </Box>
  );
};

export default Editor;
