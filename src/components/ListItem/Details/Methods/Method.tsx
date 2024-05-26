import React, { useState, useEffect } from 'react';
import {
  Stack,
  Checkbox,
  Input,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { deepClone } from '~/utils';
import type { MethodProps, MethodData } from '.';
import type { SelectChangeEvent } from '@mui/material';

const statusCodes = [200, 304, 400, 401, 403, 405, 408, 500, 501, 505];

const Method = ({ data, onChange }: MethodProps) => {
  const [methodData, setMethodData] = useState(deepClone(data));

  useEffect(() => {
    setMethodData(deepClone(data));
  }, [data]);

  const exportData = (data: typeof methodData) => {
    setMethodData(() => {
      onChange(data);
      return data;
    });
  };

  const onChangeUsage = (e: React.ChangeEvent<HTMLInputElement>) =>
    exportData({ ...methodData, isActive: e.target.checked });

  const onChangeDelay = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => exportData({ ...methodData, delay: Number(e.target.value) });

  const onChangeStatus = (e: SelectChangeEvent<number>) =>
    exportData({ ...methodData, status: Number(e.target.value) });

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Checkbox
        tabIndex={-1}
        checked={methodData.isActive}
        onChange={(e) => onChangeUsage(e)}
      />
      <Typography>{methodData.name}</Typography>

      <Stack direction="row" sx={{ ml: 'auto' }}>
        <Input
          type="number"
          disabled={!methodData.isActive}
          value={methodData.delay ?? 0}
          inputProps={{
            min: 0,
            step: 500,
          }}
          sx={{
            '& .MuiInputBase-input::-webkit-inner-spin-button': {
              opacity: 1,
            },
          }}
          onKeyDown={(e) => e.preventDefault()}
          onChange={(e) => onChangeDelay(e)}
        />
        <Select
          disabled={!methodData.isActive}
          value={methodData.status ?? 200}
          onChange={(e) => onChangeStatus(e)}
        >
          {statusCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default Method;
