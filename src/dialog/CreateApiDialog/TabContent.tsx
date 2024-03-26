import React, { ChangeEvent, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Box,
  Tab,
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ClearIcon from "@mui/icons-material/Clear";

import useAlert from "~/hooks/useAlert";
import Monaco from "~/features/Monaco";
import DropBox from "~/features/DropBox";
import { inputFileReader } from "~/utils";

import schema from "~/schema";

import type { DropFile } from "~/types/features";

const formGroupStyle = {
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

const TabContent = () => {
  const [tabValue, setTabValue] = useState("upload");
  const [uploadData, setUploadData] = useState<DropFile | null>(null);
  const [formData, setFormData] = useState(null);

  const inputFile = useRef<null | HTMLInputElement>(null);
  const { openAlert } = useAlert();

  const onChangeTab = (e: React.SyntheticEvent, value: string) => {
    setTabValue(value);
  };

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
    <Box
      sx={{
        width: "100%",
        my: "-16px",
        typography: "body1",
      }}
    >
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={onChangeTab}>
            <Tab label="파일 업로드" value="upload" />
            <Tab label="등록하기" value="form" />
          </TabList>
        </Box>
        <TabPanel value="upload">
          <FormGroup sx={formGroupStyle}>
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
              <Button
                component="label"
                variant="contained"
                sx={{ ml: 1, mt: 1.4 }}
              >
                열기
                <HiddenInput
                  ref={inputFile}
                  type="file"
                  onChange={onInputFile}
                />
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
                    height={260}
                    {...schema}
                    onChange={(data) => console.log(data)}
                  />
                ) : (
                  <DropBox
                    allow={["json"]}
                    onDrop={(data) => setUploadData(data)}
                  />
                )}
              </Box>
            </FormControl>
          </FormGroup>
        </TabPanel>

        <TabPanel value="form">
          <FormGroup sx={formGroupStyle}>
            <FormControl size="small">
              <InputLabel shrink>API Path</InputLabel>
              <OutlinedInput placeholder="ex) /user/info" defaultValue={""} />
            </FormControl>
            <FormControl size="small">
              <InputLabel shrink>Method</InputLabel>
              <Stack flexDirection="row" sx={{ mt: 0.5 }}>
                {["GET", "POST", "PATCH", "DELETE"].map((method) => (
                  <FormControlLabel
                    key={method}
                    control={
                      <Checkbox size="small" sx={{ fontSize: "12px" }} />
                    }
                    label={method}
                  />
                ))}
              </Stack>
            </FormControl>
            <FormControl size="small">
              <InputLabel shrink>JSON Data</InputLabel>
              <Box sx={{ mt: 1.5 }}>
                <Monaco
                  value={""}
                  height={260}
                  onChange={(data) => console.log(data)}
                />
              </Box>
            </FormControl>
          </FormGroup>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabContent;
