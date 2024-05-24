import React, { useRef, useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Box, Typography, Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import useAlert from '~/hooks/useAlert';
import { inputFileReader } from '~/utils';
import type { ChangeEvent } from 'react';
import type { DropFile, DropBoxProps, DropBoxEvent } from '~/types/features';

const boxStyle = {
  position: 'relative',
  width: '100%',
  height: 340,
  py: 2,
  gap: 1,
  borderRadius: '4px',
  border: '2px dashed #ddd',
  background: '#00000008',
  boxSizing: 'border-box',
  '& *': {
    color: '#aaa',
  },
};

const boxOverStyle = {
  borderColor: '#1976d2',
  backgorund: '#00000022',
  '& *': {
    color: 'primary',
  },
};

const dropAreaStyle = {
  zIndex: 10,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
};

const findButtonStyle = {
  zIndex: 11,
  position: 'relative',
  mt: 1.5,
  background: '#303030',
  '&:hover, &:focus': {
    background: '#303030',
  },
};

const HiddenInput = styled('input')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 1,
  height: 1,
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const DropBox = ({ allow, onDrop }: DropBoxProps) => {
  const [file, setFile] = useState<DropFile | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputFile = useRef<null | HTMLInputElement>(null);

  const { openAlert } = useAlert();

  useEffect(() => onDrop(file), [file]);

  const onInputFile = (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement & { files: FileList }).files[0];

    if (!file) return;

    inputFileReader(
      file,
      allow,
      (data) => {
        setFile({ ...data });
      },
      (message) => {
        openAlert({
          type: 'error',
          message,
        });
      }
    );
  };

  const onDropBox: DropBoxEvent = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      inputFileReader(
        e.dataTransfer.files[0],
        allow,
        (data) => {
          setFile({ ...data });
        },
        (message) => {
          openAlert({
            type: 'error',
            message,
          });
        }
      );
    },
    [allow]
  );

  const onDropBoxOver: DropBoxEvent = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDropBoxEnter: DropBoxEvent = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const onDropBoxLeave: DropBoxEvent = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        ...boxStyle,
        ...(isDragOver && boxOverStyle),
      }}
    >
      <Box
        onDrop={onDropBox}
        onDragOver={onDropBoxOver}
        onDragEnterCapture={onDropBoxEnter}
        onDragLeave={onDropBoxLeave}
        sx={{ ...dropAreaStyle }}
      />
      <FileOpenIcon fontSize="large" />
      <Typography>{`드래그 하여 ${allow
        .map((str) => str.toUpperCase())
        .join(',')}파일 업로드`}</Typography>
      <Button component="label" variant="contained" sx={findButtonStyle}>
        찾아보기
        <HiddenInput ref={inputFile} type="file" onChange={onInputFile} />
      </Button>
    </Stack>
  );
};

export default DropBox;
