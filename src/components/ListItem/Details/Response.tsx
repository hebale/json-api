import React, { useState, useEffect } from 'react';
import { Box, Stack, ButtonGroup } from '@mui/material';

import Monaco from '~/features/Monaco';
import CopyButton from '~/features/CopyButton';
import SaveButton from '~/features/SaveButton';

import useAlert from '~/hooks/useAlert';
import { patchApiResponse } from '~/api';

import type { editor } from 'monaco-editor';
import RefreshButton from '~/features/RefreshButton';

type ResponseProps = {
  path: string;
  value: string;
  height: number;
};

const Response = ({ path, value, height }: ResponseProps) => {
  const { mutate } = patchApiResponse();
  const [code, setCode] = useState<string>(value ?? '');
  const [validate, setValidate] = useState<
    Pick<editor.IMarker, 'endColumn' | 'endLineNumber' | 'message'>[]
  >([]);
  const [isChanged, setIsChanged] = useState(false);

  const { openAlert } = useAlert();

  useEffect(() => {
    setIsChanged(value === code);
  }, [code, value]);

  const onRefreshCode = () => setCode(value);
  const onSaveCode = async () => {
    if (validate.length) {
      return openAlert({
        type: 'error',
        message: `JSON 양식을 확인해주세요.\n${validate
          .map(
            ({ endLineNumber, endColumn, message }) =>
              `${endLineNumber}:${endColumn} ${message}`
          )
          .join(`\n`)}`,
        timer: 5000,
      });
    }

    mutate(
      { path, response: code },
      {
        onSuccess: () => {
          openAlert({ type: 'success', message: '저장 되었습니다' });
        },
        onError: () => {
          openAlert({
            type: 'error',
            message: '오류가 발생했습니다. 다시 시도해 주세요.',
          });
        },
      }
    );
  };

  const onValidateCode = (makers: editor.IMarker[]) => {
    setValidate(makers);
  };

  return (
    <Box>
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
            title="Copy"
            data={path}
            onSuccess={() =>
              openAlert({
                type: 'info',
                message: '클립보드에 복사 되었습니다.',
              })
            }
            onError={(msg) =>
              openAlert({
                type: 'error',
                message: `${msg}\n복사 중 오류가 발생했습니다. 다시 시도해 주세요.`,
              })
            }
          />
          <RefreshButton
            title="Refresh"
            disabled={isChanged}
            onClick={onRefreshCode}
          />
          <SaveButton title="Save" disabled={isChanged} onClick={onSaveCode} />
        </ButtonGroup>
      </Stack>
      <Monaco
        value={code}
        height={height}
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

export default Response;
