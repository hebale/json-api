import React, { useState, useEffect, useCallback } from "react";
import { Stack, Box, Typography } from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";

import useAlert from "~/hooks/useAlert";
import { inputFileReader } from "~/utils";
import type { DropFile, DropBoxProps, DropBoxEvent } from "~/types/features";

const boxStyle = {
  position: "relative",
  height: 260,
  py: 2,
  gap: 1,
  borderRadius: "4px",
  border: "2px dashed #ddd",
  background: "#00000008",
  boxSizing: "border-box",
  "& *": {
    color: "#aaa",
  },
};

const boxOverStyle = {
  borderColor: "#1976d2",
  backgorund: "#00000022",
  "& *": {
    color: "#1976d2",
  },
};

const dropAreaStyle = {
  zIndex: 10,
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
};

const DropBox = ({ allow, onDrop }: DropBoxProps) => {
  const [file, setFile] = useState<DropFile | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const { openAlert } = useAlert();

  useEffect(() => onDrop(file), [file]);

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
            type: "error",
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
      <Typography>드래그 하여 JSON 파일 업로드</Typography>
    </Stack>
  );
};

export default DropBox;
