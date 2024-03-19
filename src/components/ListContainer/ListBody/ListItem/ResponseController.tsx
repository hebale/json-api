import React, { useState } from "react";
import {
  Stack,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const methodColor = {
  POST: "#49cc90",
  GET: "#61affe",
  PATCH: "#fca130",
  DELETE: "#f93e3e",
};

const ResponseController = ({ methods, delay, status }) => {
  const [resDelay, setResDelay] = useState(delay);
  const [resStatus, setResStatus] = useState(status);

  const onChangeDelay = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => console.log(e.target.value);

  const onChnageStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => console.log(e.target.value);

  return methods.map((method: string, index: number) => (
    <Stack
      key={method}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 1,
        ...(index > 0 && { borderTop: "1px solid #eee" }),
      }}
    >
      {/* <Chip
        label={method}
        variant="outlined"
        size="small"
        sx={{
          p: 1,
          borderRadius: "3px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          borderColor: methodColor[method],
          background: methodColor[method],
        }}
      /> */}
      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
        {method}
      </Typography>
      <Stack flexDirection="row">
        <FormControl
          variant="outlined"
          size="small"
          sx={{ m: 1, width: "80px", height: "30px" }}
        >
          <InputLabel>delay</InputLabel>
          <OutlinedInput
            type="number"
            label="delay"
            value={resDelay[index]}
            onChange={(event) => onChangeDelay(event, index)}
            inputProps={{
              min: 0,
              step: 100,
            }}
            sx={{
              height: "30px",
            }}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ m: 1, width: "80px", height: "30px" }}
        >
          <InputLabel>status</InputLabel>
          <Select
            label="status"
            size="small"
            value={resStatus[index]}
            onChange={(event) => onChnageStatus(event, index)}
            sx={{ height: "30px" }}
          >
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={401}>401</MenuItem>
            <MenuItem value={403}>403</MenuItem>
            <MenuItem value={404}>404</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={505}>505</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  ));
};

export default ResponseController;
