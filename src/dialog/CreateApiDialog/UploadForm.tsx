import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Stack,
  Box,
  FormGroup,
  FormLabel,
  FormControl,
  Typography,
  Chip,
} from '@mui/material';

import Monaco from '~/features/Monaco';
import DropBox from '~/features/DropBox';

import schema from '~/schema';
import { DialogContentContext } from '~/features/Dialogs';

import type { DropFile } from '~/types/features';

const UploadForm = () => {
  const [code, setCode] = useState<string>('');
  const [uploadData, setUploadData] = useState<DropFile | null>(null);
  const inputFile = useRef<null | HTMLInputElement>(null);
  const setDatas = useContext(DialogContentContext);

  useEffect(() => {
    setDatas && setDatas(code || uploadData?.data);
  }, [code, uploadData]);

  const onInputFileClear = () => {
    setUploadData(null);
    (inputFile.current as HTMLInputElement).value = '';
  };

  return (
    <Stack>
      <FormGroup>
        {uploadData ? (
          <>
            <FormLabel>JSON Full Data</FormLabel>
            <Box sx={{ mt: 0.5, mb: 1 }}>
              <Chip
                label={
                  <Stack flexDirection="row" alignItems="center">
                    {uploadData.name}
                    <Typography
                      sx={{ ml: 0.2, fontSize: '10px', fontWeight: 300 }}
                    >
                      ({uploadData.size}byte)
                    </Typography>
                  </Stack>
                }
                onDelete={onInputFileClear}
              />
            </Box>
          </>
        ) : (
          <FormLabel>Upload</FormLabel>
        )}

        <FormControl size="small">
          {uploadData ? (
            <Monaco
              value={uploadData.data as string}
              height={500}
              {...schema}
              onChange={(data) => data && setCode(data)}
            />
          ) : (
            <DropBox allow={['json']} onDrop={(data) => setUploadData(data)} />
          )}
        </FormControl>
      </FormGroup>
    </Stack>
  );
};

export default UploadForm;
