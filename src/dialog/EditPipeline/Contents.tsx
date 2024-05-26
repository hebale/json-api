import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import CopyButton from '~/features/CopyButton';
import Monaco from '~/features/Monaco';
import useAlert from '~/hooks/useAlert';
import { getJson, putJson } from '~/api';

import type { editor } from 'monaco-editor';

type EditorProps = {
  path: string;
  value: string;
};

const defaultJs = `function pipeline(request, response) {\n  const { query, body} = request;\n  // code goes here\n\n\n  return response;\n}`;

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(13.5px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,.35)',
    boxSizing: 'border-box',
  },
}));

const Contents = ({ path, value }: EditorProps) => {
  const [origin, setOrigin] = useState<string>('');
  const [code, setCode] = useState<string>(defaultJs);
  const [validate, setValidate] = useState<
    Pick<editor.IMarker, 'endColumn' | 'endLineNumber' | 'message'>[]
  >([]);
  const [isChanged, setIsChanged] = useState(false);
  const { openAlert } = useAlert();

  // useEffect(() => {
  //   getJsonData();
  // }, []);

  useEffect(() => {
    setIsChanged(origin === code);
  }, [code]);

  const getJsonData = async () => {
    const response = await getJson(path);

    delete response?.data.path; // 수정불가항목 미노출

    const strJson = JSON.stringify(response?.data, null, 2);

    setCode(strJson);
    setOrigin(strJson);
  };

  const onSaveCode = async () => {
    return;
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
    <>
      <FormGroup sx={{ mr: 'auto', color: '#fff' }}>
        <Tooltip title="코드실행" placement="top" arrow>
          <CustomSwitch defaultChecked />
        </Tooltip>
        <Tooltip title="사용여부" placement="top" arrow>
          <CustomSwitch defaultChecked />
        </Tooltip>
      </FormGroup>

      <Stack
        alignItems="center"
        gap={2}
        sx={{
          width: '100%',
          '& .MuiBox-root': {
            border: '1px solid #eee',
          },
          '& > .MuiBox-root': {
            width: '33.3%',
          },
        }}
      >
        <Box>
          <Stack direction="row">
            <Box>
              <FormLabel>request</FormLabel>
            </Box>
            <Box>
              <FormLabel>response</FormLabel>
            </Box>
          </Stack>
        </Box>
        <KeyboardDoubleArrowDownIcon />
        <Box>
          <FormLabel>pipeline</FormLabel>
        </Box>
        <KeyboardDoubleArrowDownIcon />
        <Box>
          <FormLabel>result</FormLabel>
        </Box>
      </Stack>

      {/* <Stack direction="row">
        <Stack direction="row">
          <Box>
            <FormLabel sx={{ fontSize: "14px" }}>
              request
            </FormLabel>
            <Monaco
              value={''}
              language="json"
              onChange={(data) => setCode(data ?? "")}
              onValidate={(makers) => onValidateCode(makers)}
            />
          </Box>
          <Box>
            <FormLabel sx={{ fontSize: "14px" }}>
              reponse
            </FormLabel>
            <Monaco
              value={''}
              language="json"
              onChange={(data) => setCode(data ?? "")}
              onValidate={(makers) => onValidateCode(makers)}
            />
          </Box>
        </Stack>
        <Box>
          <FormLabel sx={{ fontSize: "14px" }}>
            Pipeline
          </FormLabel>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              zIndex: -1,
              px: 1.5,
              py: 0.8,
              borderRadius: "4px 4px 0 0",
              background: "#1e1e1e",
            }}
          >
            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                "> .MuiIconButton-root": { color: "#fff" },
                "> .MuiIconButton-root.Mui-disabled": { color: "#ffffff55" },
              }}
            >
              <CopyButton
                text={code}
                tooltip={{
                  title: "Copy",
                  placement: "top",
                  arrow: true,
                }}
                onCopied={() =>
                  openAlert({
                    type: "info",
                    message: "클립보드에 복사 되었습니다.",
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
            language="javascript"
            boxStyle={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onChange={(data) => setCode(data ?? "")}
            onValidate={(makers) => onValidateCode(makers)}
          />
        </Box>
      </Stack> */}
    </>
  );
};

export default Contents;
