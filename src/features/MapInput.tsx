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

import { deepClone } from '~/utils';

type MapInputProps = {
  datas?: MapData[];
  onChange: (datas: MapData[]) => void;
};

export type MapData = {
  uuid: string;
  isActive: boolean;
  key: string;
  value: string;
  [key: string]: string | boolean;
};

const createDefaultMapInput = () => ({
  uuid: crypto.randomUUID(),
  isActive: false,
  key: '',
  value: '',
});

const MapInput = ({ datas, onChange }: MapInputProps) => {
  const [mapData, setMapData] = useState<MapData[]>([]);
  const focusInput = useRef<HTMLInputElement[]>([]);
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!datas?.length && !mapData.length) return onAddRow();
    setMapData(() => deepClone(datas).concat(createDefaultMapInput()));

    /* input focus */
    if (focusIndex.current !== null) {
      focusInput.current[focusIndex.current].focus();
      focusIndex.current = null;
    }
  }, [datas]);

  useEffect(() => {
    if (!mapData.length) return;
    const { key, value } = mapData?.at(-1) as MapData;
    if (!!key || !!value) onAddRow();
  }, [mapData]);

  const onAddRow = () => {
    setMapData(() => [...mapData, createDefaultMapInput()]);
  };

  const exportData = (datas: MapData[]) => {
    setMapData(() => {
      onChange(datas);
      return datas;
    });
  };

  const onChangeUsage = (
    e: React.ChangeEvent<HTMLInputElement>,
    uuid: string
  ) => {
    exportData(
      mapData.map((data) => {
        if (data.uuid === uuid) data.isActive = e.target.checked;
        return data;
      })
    );
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    uuid: string,
    key: string
  ) => {
    exportData(
      mapData.map((data) => {
        if (data.uuid === uuid) {
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

  const onRemoveRow = (uuid: string) => {
    // const isOnChange = !mapData.some((data) => data.uuid === uuid && !data.key);
    const removedData = mapData.filter((data) => data.uuid !== uuid);

    exportData(removedData.slice(0, removedData.length - 1));
    // isOnChange ? exportData(removedData) : setMapData(removedData);
  };

  return (
    <>
      <TableContainer>
        <Table
          padding="none"
          sx={{ '& .MuiTableCell-root': { p: 1, border: '1px solid #ddd' } }}
        >
          <TableBody>
            {mapData.map(({ uuid, isActive, key, value }, index) => (
              <TableRow key={uuid}>
                <TableCell sx={{ width: '40px' }}>
                  <Checkbox
                    tabIndex={-1}
                    checked={isActive}
                    disabled={!key}
                    onChange={(e) => onChangeUsage(e, uuid)}
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
                      onChange={(e) => onChangeData(e, uuid, 'key')}
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
                      onChange={(e) => onChangeData(e, uuid, 'value')}
                      onBlur={onBlurData}
                      sx={{ ml: 1, width: 'calc(50% - 24px)' }}
                    />
                    {/* <div>{uuid}</div> */}
                    <div style={{ width: '40px' }}>
                      {mapData.length !== 1 && mapData.length - 1 !== index && (
                        <IconButton
                          tabIndex={-1}
                          color="error"
                          onClick={() => onRemoveRow(uuid)}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      )}
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MapInput;
