import React from "react";
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

const UploadForm = () => {
  return (
    <FormGroup sx={style}>
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
              control={<Checkbox size="small" sx={{ fontSize: "12px" }} />}
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
            height={500}
            {...schema}
            onChange={(data) => console.log(data)}
          />
        </Box>
      </FormControl>
    </FormGroup>
  );
};

export default UploadForm;
