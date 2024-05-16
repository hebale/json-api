import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Checkbox,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type KeyValueInputProps = {
  datas?: KeyValueData[];
  onChange: (datas: KeyValueData[]) => void;
};

export type KeyValueData = {
  isActive: boolean;
  key: string;
  value: string;
  [key: string]: string | number | boolean;
};

const KeyValueInput = ({ datas, onChange }: KeyValueInputProps) => {
  const [headers, setHeaders] = useState<KeyValueData[]>(datas ?? []);
  console.log(datas);
  useEffect(() => {
    setHeaders(datas ?? []);
  }, [datas]);

  const beforeOnChange = (headers: KeyValueData[]) => {
    console.log(datas[0] === headers[0]);
    onChange(headers);
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    console.log(e.target.checked);
    beforeOnChange(
      headers.map((data) => {
        if (data.key === key) data.isActive = e.target.checked;
        return data;
      })
    );
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    key: string
  ) => {
    beforeOnChange(
      headers.map((data, _index) => {
        if (index === _index) {
          data[key] = e.target.value;
        }
        return data;
      })
    );
  };

  const onAddRow = () => {
    setHeaders((prev) => [...prev, { isActive: false, key: '', value: '' }]);
  };

  const onRemoveRow = (key: string) => {
    beforeOnChange(headers.filter((data) => data.key !== key));
  };

  return (
    <>
      <TableContainer>
        <Table
          padding="none"
          sx={{ '& .MuiTableCell-root': { p: 1, border: '1px solid #ddd' } }}
        >
          <TableBody>
            {headers.map(({ isActive, key, value }, index) => (
              <TableRow key={key ? key : new Date().getTime() + index}>
                <TableCell sx={{ width: '40px' }}>
                  <Checkbox
                    tabIndex={-1}
                    checked={isActive}
                    onChange={(e) => onChangeUsage(e, key)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row">
                    <OutlinedInput
                      size="small"
                      placeholder="key"
                      defaultValue={key}
                      onChange={(e) => onChangeData(e, index, 'key')}
                      sx={{ width: 'calc(50% - 24px)' }}
                    />
                    <OutlinedInput
                      size="small"
                      placeholder="value"
                      defaultValue={value}
                      onChange={(e) => onChangeData(e, index, 'value')}
                      sx={{ ml: 1, width: 'calc(50% - 24px)' }}
                    />
                    {headers.length - 1 > index && (
                      <IconButton
                        tabIndex={-1}
                        color="error"
                        onClick={() => onRemoveRow(key)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center">
        <IconButton tabIndex={-1} color="info" onClick={onAddRow}>
          <AddCircleIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default KeyValueInput;
