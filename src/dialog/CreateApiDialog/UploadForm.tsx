import React, { useState, useEffect, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import useAlert from "~/hooks/useAlert";
import Monaco from "~/features/Monaco";
import DropBox from "~/features/DropBox";
import { inputFileReader } from "~/utils";

import schema from "~/schema";
import { DialogContentContext } from "~/features/Dialogs";

import type { DropFile, JSONData } from "~/types/features";
import type { ChangeEvent } from "react";

const style = {
  "& .MuiFormControl-root + .MuiFormControl-root": {
    mt: 4,
  },
  "& .MuiInputLabel-root": {
    ml: -1,
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root": {
    mt: 1.5,
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
  },
};

const HiddenInput = styled("input")({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: 1,
  height: 1,
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

const UploadForm = () => {
  const [code, setCode] = useState<string>("");
  const [uploadData, setUploadData] = useState<DropFile | null>(null);
  const inputFile = useRef<null | HTMLInputElement>(null);
  const setDatas = useContext(DialogContentContext);
  const { openAlert } = useAlert();

  useEffect(() => {
    setDatas && setDatas(code || uploadData?.data);
  }, [code, uploadData]);

  const onInputFileClear = () => {
    setUploadData(null);
    (inputFile.current as HTMLInputElement).value = "";
  };

  const onInputFile = (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement & { files: FileList }).files[0];

    if (!file) return;

    inputFileReader(
      file,
      ["json"],
      (data) => {
        setUploadData({ ...data });
      },
      (message) => {
        openAlert({
          type: "error",
          message,
        });
      }
    );
  };

  return (
    <FormGroup sx={style}>
      <FormControl size="small" sx={{ flexDirection: "row" }}>
        <InputLabel shrink>File Name</InputLabel>
        <OutlinedInput
          value={uploadData?.name ?? ""}
          sx={{ pr: 0, fontSize: "14px" }}
          endAdornment={
            <IconButton onClick={onInputFileClear} disabled={!uploadData}>
              <ClearIcon fontSize="small" />
            </IconButton>
          }
          disabled
        />
        <Button component="label" variant="contained" sx={{ ml: 1, mt: 1.4 }}>
          열기
          <HiddenInput ref={inputFile} type="file" onChange={onInputFile} />
        </Button>
      </FormControl>
      <FormControl size="small">
        {uploadData ? (
          <InputLabel shrink>JSON Full Data</InputLabel>
        ) : (
          <InputLabel shrink>Upload</InputLabel>
        )}
        <Box sx={{ mt: 1.5 }}>
          {uploadData ? (
            <Monaco
              value={uploadData.data as string}
              height={500}
              {...schema}
              options={{ readOnly: true }}
              onChange={(data) => data && setCode(data)}
            />
          ) : (
            <DropBox allow={["json"]} onDrop={(data) => setUploadData(data)} />
          )}
        </Box>
      </FormControl>
    </FormGroup>
  );
};

export default UploadForm;
