import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

type KeyValueInputProps = {
  onChange: (datas: KeyValueData[]) => void;
};
type KeyValueData = {
  id: number;
  status: boolean;
  key: string;
  value: string;
  [key: string]: string | number | boolean;
};

const KeyValueInput = ({ onChange }: KeyValueInputProps) => {
  const [datas, setDatas] = useState<KeyValueData[]>([]);

  useEffect(() => {
    if (!datas.length) addTableRow();

    onChange(datas);
  }, [datas]);

  const addTableRow = () => {
    setDatas((prev) => [
      ...prev,
      { id: new Date().getTime(), status: false, key: '', value: '' },
    ]);
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setDatas((prev) =>
      prev.map((data) => {
        if (data.id === id) data.status = e.target.checked;
        return data;
      })
    );
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    key: string
  ) => {
    setDatas((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          data[key] = e.target.value;
        }
        return data;
      })
    );

    if (datas.at(-1)?.id === id) addTableRow();
  };

  const onRemoveTableRow = (id: number) => {
    setDatas((prev) => prev.filter((data) => data.id !== id));
  };

  return (
    <TableContainer>
      <Table
        padding="none"
        sx={{ '& .MuiTableCell-root': { p: 0.6, border: '1px solid #ddd' } }}
      >
        <TableBody>
          {datas.map(({ id, status, key, value }, index) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Checkbox
                    tabIndex={-1}
                    checked={status}
                    disabled={datas.at(-1)?.id === id}
                    onChange={(e) => onChangeUsage(e, id)}
                  />
                </TableCell>
                <TableCell>
                  <OutlinedInput
                    size="small"
                    placeholder="key"
                    defaultValue={key}
                    onChange={(e) => onChangeData(e, id, 'key')}
                    sx={{ width: '100%' }}
                  />
                </TableCell>
                <TableCell>
                  <OutlinedInput
                    size="small"
                    placeholder="value"
                    defaultValue={value}
                    onChange={(e) => onChangeData(e, id, 'value')}
                    sx={{ width: '100%' }}
                  />
                </TableCell>
                {datas.length > 1 && (
                  <TableCell>
                    <IconButton
                      tabIndex={-1}
                      color="error"
                      onClick={() => onRemoveTableRow(id)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeyValueInput;
