import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  Box,
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Monaco from "~/features/Monaco";
import schema from "~/schema";

import { DialogContentContext } from "~/features/Dialogs";

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

const jsonData = {
  apiPath: "",
  headers: {
    "Content-Type": "application/json",
  },
  methods: [],
  response: [],
};

const UploadForm = () => {
  const setDatas = useContext(DialogContentContext);
  const [code, setCode] = useState(jsonData);

  const [path, setPath] = useState("");

  useEffect(() => {}, []);

  const onChangePath = (value: string) => {
    setCode((prev) => {
      return { ...prev, apiPath: value };
    });
  };

  return (
    <FormGroup sx={style}>
      <Stack direction="row" gap={2} justifyContent="space-between">
        <Stack sx={{ width: "35%" }}>
          <FormControl size="small">
            <InputLabel shrink>API Path</InputLabel>
            <OutlinedInput
              placeholder="ex) /user/info"
              defaultValue={""}
              onChange={(e) => onChangePath(e.target.value)}
            />
          </FormControl>
          <FormControl size="small">
            <InputLabel shrink>Method</InputLabel>
            <Stack flexDirection="row" sx={{ mt: 0.5 }}>
              {["GET", "POST", "PATCH", "DELETE"].map((method) => (
                <FormControlLabel
                  key={method}
                  control={<Checkbox size="small" sx={{ fontSize: "12px" }} />}
                  label={method}
                />
              ))}
            </Stack>
          </FormControl>
        </Stack>

        <FormControl size="small" sx={{ width: "65%" }}>
          <InputLabel shrink>JSON Data</InputLabel>
          <Box sx={{ mt: 1.5 }}>
            <Monaco
              value={JSON.stringify(code, null, 2)}
              height={500}
              {...schema}
              onChange={(data) => console.log(data)}
            />
          </Box>
        </FormControl>
      </Stack>
    </FormGroup>
  );
};

export default UploadForm;
