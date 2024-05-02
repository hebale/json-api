import React, { useState } from 'react';
import {
  Stack,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  ButtonGroup,
  Typography,
  SelectChangeEvent,
  IconButton,
  Tooltip,
} from '@mui/material';

import useAlert from '~/hooks/useAlert';
import CodeIcon from '@mui/icons-material/Code';

import { patchJsonMethods } from '~/api';

import type { ApiListItemProps } from '~/types/components';
import EditPipeline from '~/dialog/EditPipeline';

type FormData = {
  delay: number;
  status: number;
};

const Methods = ({
  path,
  headers,
  methods,
}: Omit<ApiListItemProps, 'response'>): JSX.Element[] => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const { openAlert } = useAlert();

  const onChangePipeline = async () => {};

  const onChangeDelay = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    method: string
  ) => {
    const response = await patchJsonMethods({
      path,
      method,
      delay: Number(e.target.value),
    });

    !response &&
      openAlert({
        type: 'error',
        message: '오류가 발생했습니다. 다시 시도해 주세요.',
      });
  };

  const onChangeStatus = async (
    e: SelectChangeEvent<number>,
    method: string
  ) => {
    const response = await patchJsonMethods({
      path,
      method,
      status: e.target.value,
    });

    !response &&
      openAlert({
        type: 'error',
        message: '오류가 발생했습니다. 다시 시도해 주세요.',
      });
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
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px',
        background: '#fff',
      }}
    >
      <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
        {method}
      </Typography>

      <Stack flexDirection="row" alignItems="center">
        {/* <FormGroup sx={{ mr: 1 }}>
          <EditPipeline path={path} method={method} />
        </FormGroup> */}

        <FormGroup
          row={true}
          sx={{
            '& .MuiFormControl-root': {
              width: 80,
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
              defaultValue={delay}
              inputProps={{
                min: 0,
                step: 500,
              }}
              sx={{
                height: '30px',
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
              defaultValue={status}
              sx={{ height: '30px', background: '#fff' }}
              onChange={(e) => onChangeStatus(e, method)}
            >
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={304}>304</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={401}>401</MenuItem>
              <MenuItem value={403}>403</MenuItem>
              <MenuItem value={405}>405</MenuItem>
              <MenuItem value={408}>408</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={501}>501</MenuItem>
              <MenuItem value={505}>505</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </Stack>
    </Stack>
  ));
};

export default Methods;
