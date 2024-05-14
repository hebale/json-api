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

type KeyValueInputProps = {
  datas?: KeyValueData[];
  onChange: (datas: KeyValueData[]) => void;
};

type KeyValueData = {
  id: string;
  isActive: boolean;
  key: string;
  value: string;
  [key: string]: string | boolean;
};

const KeyValueInput = ({ datas, onChange }: KeyValueInputProps) => {
  const [headers, setHeaders] = useState<KeyValueData[]>(
    datas
      ?.map((data) => ({ ...data, id: `${data.key}_${data.value}` }))
      .concat({
        id: '' + new Date().getTime(),
        isActive: false,
        key: '',
        value: '',
      }) ?? []
  );

  useEffect(() => {
    if (!headers.length) addTableRow();

    onChange(headers);
  }, [headers]);

  const addTableRow = () => {
    setHeaders((prev) => [
      ...prev,
      { id: '' + new Date().getTime(), isActive: false, key: '', value: '' },
    ]);
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setHeaders((prev) =>
      prev.map((data) => {
        if (data.id === id) data.isActive = e.target.checked;
        return data;
      })
    );
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    key: string
  ) => {
    setHeaders((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          data[key] = e.target.value;
        }
        return data;
      })
    );

    if (headers.at(-1)?.id === id) addTableRow();
  };

  const onRemoveTableRow = (id: string) => {
    setHeaders((prev) => prev.filter((data) => data.id !== id));
  };

  return (
    <TableContainer>
      <Table
        padding="none"
        sx={{ '& .MuiTableCell-root': { p: 1, border: '1px solid #ddd' } }}
      >
        <TableBody>
          {headers.map(({ id, isActive, key, value }, index) => {
            return (
              <TableRow key={id}>
                <TableCell sx={{ width: '40px' }}>
                  <Checkbox
                    tabIndex={-1}
                    checked={isActive}
                    disabled={headers.at(-1)?.id === id}
                    onChange={(e) => onChangeUsage(e, id)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row">
                    <OutlinedInput
                      size="small"
                      placeholder="key"
                      defaultValue={key}
                      onChange={(e) => onChangeData(e, id, 'key')}
                      sx={{ width: 'calc(50% - 24px)' }}
                    />
                    <OutlinedInput
                      size="small"
                      placeholder="value"
                      defaultValue={value}
                      onChange={(e) => onChangeData(e, id, 'value')}
                      sx={{ ml: 1, width: 'calc(50% - 24px)' }}
                    />
                    {headers.length - 1 > index && (
                      <IconButton
                        tabIndex={-1}
                        color="error"
                        onClick={() => onRemoveTableRow(id)}
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
  );
};

export default KeyValueInput;
