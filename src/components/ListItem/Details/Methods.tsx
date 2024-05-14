import React, { useContext } from 'react';
import {
  Stack,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

import { patchApiMethod } from '~/api';
import { ApiContext } from '~/components/ListItem';
import useAlert from '~/hooks/useAlert';

import type { ApiData } from '~/types/components';
import type { ApiListItemProps } from '~/types/components';

type FormData = {
  delay: number;
  status: number;
};

const statusCode = [200, 304, 400, 401, 403, 405, 408, 500, 501, 505];

const Methods = () => {
  const { path, methods } = useContext(ApiContext) as ApiData;

  const { mutate } = patchApiMethod();
  const { openAlert } = useAlert();

  const onChangeDelay = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    method: string
  ) => {
    mutate(
      { path, method, delay: Number(e.target.value) },
      {
        onError: () =>
          openAlert({
            type: 'error',
            message: '오류가 발생했습니다. 다시 시도해 주세요.',
          }),
      }
    );
  };

  const onChangeStatus = async (
    e: SelectChangeEvent<number>,
    method: string
  ) => {
    mutate(
      { path, method, status: e.target.value },
      {
        onError: () => {
          openAlert({
            type: 'error',
            message: '오류가 발생했습니다. 다시 시도해 주세요.',
          });
        },
      }
    );
  };

  return methods.map(({ method, delay, status }, index) => (
    <Stack
      key={method}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        ...(index > 0 && { mt: 1 }),
        p: 1,
        px: 2,
        borderRadius: '4px',
        background: '#fff',
      }}
    >
      <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
        {method}
      </Typography>

      <Stack flexDirection="row" alignItems="center">
        <FormGroup
          row={true}
          sx={{
            '& .MuiFormControl-root': {
              width: 100,
            },
            '& .MuiFormControl-root + .MuiFormControl-root': {
              ml: 1,
            },
          }}
        >
          <FormControl variant="outlined" size="small">
            <InputLabel>delay</InputLabel>
            <OutlinedInput
              type="number"
              label="delay"
              value={delay ?? ''}
              inputProps={{
                min: 0,
                step: 500,
              }}
              sx={{
                height: '34px',
                fontSize: '13px',
                '& .MuiInputBase-input': {
                  pr: 1,
                  background: '#fff',
                },
                '& .MuiInputBase-input::-webkit-inner-spin-button': {
                  opacity: 1,
                },
              }}
              onChange={(e) => onChangeDelay(e, method)}
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>status</InputLabel>
            <Select
              label="status"
              value={status}
              sx={{ height: '34px', fontSize: '13px', background: '#fff' }}
              onChange={(e) => onChangeStatus(e, method)}
            >
              {statusCode.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </Stack>
    </Stack>
  ));
};

export default Methods;
