import React, { useState, useEffect, useContext } from 'react';
import {
  Stack,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Input,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

import { patchApiMethod } from '~/api';
import { ApiContext } from '~/components/ListItem';

import type { ApiData } from '~/types/components';

const methodNames = ['GET', 'POST', 'PATCH', 'PULL', 'DELETE'];
const statusCode = [200, 304, 400, 401, 403, 405, 408, 500, 501, 505];

const Method = ({ data, onChange }) => {
  const [methodData, setMethodData] = useState(datas);

  useEffect(() => {
    onChange(methodData);
  }, [methodData]);

  const onChangeDelay = (e) => {
    console.log(e);
  };

  const onChangeStatus = (e) => {
    console.log(e);
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Checkbox
        tabIndex={-1}
        checked={methodData.isActive}
        onChange={(e) => onChange(e, name)}
      />
      <Typography>{methodData.name}</Typography>
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{
          ml: 'auto',
          '& .MuiFormControl-root + .MuiFormControl-root': {
            ml: 1,
          },
        }}
      >
        <FormGroup row={true}>
          <FormControl variant="outlined" size="small">
            <Input
              type="number"
              value={methodData.delay ?? 0}
              onChange={onChangeDelay}
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <Select
              value={methodData.status ?? 200}
              onChange={(e) => onChangeStatus(e)}
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
  );
};

const Methods = () => {
  const [methodDatas, setMethodDatas] = useState();

  return methodDatas.map((data) => <Method data={data} />);
};

export default Methods;

const Methods2 = () => {
  const { path, methods } = useContext(ApiContext) as ApiData;

  const { mutate } = patchApiMethod();

  const onChangeDelay = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    method: string
  ) => {
    mutate({ path, method, delay: Number(e.target.value) });
  };

  const onChangeStatus = async (
    e: SelectChangeEvent<number>,
    method: string
  ) => {
    mutate({ path, method, status: e.target.value });
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
