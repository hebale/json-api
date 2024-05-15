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

export type KeyValueData = {
  isActive: boolean;
  key: string;
  value: string;
  [key: string]: string | number | boolean;
};

const defaultForm = {
  isActive: false,
  key: '',
  value: '',
};

const KeyValueInput = ({ datas, onChange }: KeyValueInputProps) => {
  const [headers, setHeaders] = useState<(KeyValueData & { id: number })[]>([]);

  useEffect(() => {
    setHeaders(
      datas
        ?.map((data, index) => ({
          ...data,
          id: new Date().getTime() + (index + 1),
        }))
        .concat({ id: new Date().getTime(), ...defaultForm }) ?? []
    );
  }, [datas]);

  // useEffect(() => {
  //   if (!headers.length) addTableRow();
  //   onChange(
  //     headers.map((header) => {
  //       delete header.id;
  //       return header;
  //     })
  //   );
  // }, [headers]);

  const exportDatas = (datas: KeyValueData[]) => {
    onChange(
      datas
        .map((data) => {
          delete data.id;
          return data;
        })
        .slice(0, -1)
    );
  };

  const addTableRow = () => {
    setHeaders((prev) => [
      ...prev,
      { id: new Date().getTime(), isActive: false, key: '', value: '' },
    ]);
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    exportDatas(
      headers.map((data) => {
        if (data.id === id) data.isActive = e.target.checked;
        return data;
      })
    );
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    key: string
  ) => {
    exportDatas(
      headers.map((data) => {
        if (data.id === id) {
          data[key] = e.target.value;
        }
        return data;
      })
    );

    if (headers.at(-1)?.id === id) addTableRow();
  };

  const onRemoveTableRow = (id: number) => {
    exportDatas(headers.filter((data) => data.id !== id));
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
              <TableRow key={index}>
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
