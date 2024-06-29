import React, { useState, useEffect, useRef } from 'react';
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

import { deepClone } from '~/utils';

type KeyValueInputProps = {
  datas?: KeyValueData[];
  onChange: (datas: KeyValueData[]) => void;
};

export type KeyValueData = {
  tempKey?: number;
  isActive: boolean;
  key: string;
  value: string;
  [key: string]: string | number | boolean;
};

const KeyValueInput = ({ datas, onChange }: KeyValueInputProps) => {
  const [headers, setHeaders] = useState<KeyValueData[]>(
    deepClone(datas) ?? []
  );

  const focusInput = useRef<HTMLInputElement[] | []>([]);
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    setHeaders(deepClone(datas) ?? []);

    if (focusIndex.current !== null) {
      focusInput.current[focusIndex.current].focus();
      focusIndex.current = null;
    }
  }, [datas]);

  const beforeOnChange = (headers: KeyValueData[]) => {
    onChange(
      headers
        .filter((header) => !!header.key)
        .map((header) => {
          if (header.tempKey) delete header.tempKey;
          return header;
        })
    );
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
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

  const onFocusData = (index: number) => {
    focusIndex.current = index;
  };

  const onBlurData = () => {
    focusIndex.current = null;
  };

  const onAddRow = () => {
    setHeaders((prev) => [
      ...prev,
      { tempKey: new Date().getTime(), isActive: false, key: '', value: '' },
    ]);
  };

  const onRemoveRow = (key?: string | number) => {
    const isTemp = typeof key === 'number';

    setHeaders((prev) => {
      const newValue = prev.filter(
        (data) => data[isTemp ? 'tempKey' : 'key'] !== key
      );

      if (!isTemp) beforeOnChange(newValue);

      return newValue;
    });
  };

  return (
    <>
      <TableContainer>
        <Table
          padding="none"
          sx={{ '& .MuiTableCell-root': { p: 1, border: '1px solid #ddd' } }}
        >
          <TableBody>
            {headers.map(({ tempKey, isActive, key, value }, index) => {
              // console.log(key, tempKey);
              return (
                <TableRow key={key ? key : tempKey}>
                  <TableCell sx={{ width: '40px' }}>
                    <Checkbox
                      tabIndex={-1}
                      checked={isActive}
                      disabled={!key}
                      onChange={(e) => onChangeUsage(e, key)}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <OutlinedInput
                        inputRef={(element) => {
                          if (element) {
                            focusInput.current[index * 2] = element;
                          }
                        }}
                        size="small"
                        placeholder="key"
                        defaultValue={key}
                        onFocus={() => onFocusData(index * 2)}
                        onChange={(e) => onChangeData(e, index, 'key')}
                        onBlur={onBlurData}
                        sx={{ width: 'calc(50% - 24px)' }}
                      />
                      <OutlinedInput
                        inputRef={(element) => {
                          if (element) {
                            focusInput.current[index * 2 + 1] = element;
                          }
                        }}
                        size="small"
                        placeholder="value"
                        defaultValue={value}
                        onFocus={() => onFocusData(index * 2 + 1)}
                        onChange={(e) => onChangeData(e, index, 'value')}
                        onBlur={onBlurData}
                        sx={{ ml: 1, width: 'calc(50% - 24px)' }}
                      />
                      {headers.length !== 1 && (
                        <IconButton
                          tabIndex={-1}
                          color="error"
                          onClick={() => onRemoveRow(key ? key : tempKey)}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
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
