import React, { useState } from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

type InputEventFnType = (
  event: React.ChangeEvent<HTMLInputElement>,
  index: number
) => void;

const methodColor = {
  POST: "#49cc90",
  GET: "#61affe",
  PATCH: "#fca130",
  DELETE: "#f93e3e",
};

const inputStyle = {
  m: 1,
  width: "80px",
  height: "30px",
  background: "#fff",
};

const ResponseController = ({ methods, delay, status, onUpdateData }) => {
  const onChangeDelay: InputEventFnType = (event, index) => {
    onUpdateData("delay", [
      ...delay.slice(0, index),
      +event.target.value,
      ...delay.slice(index + 1),
    ]);
  };

  const onChnageStatus: InputEventFnType = (event, index) =>
    console.log(event.target.value);

  return methods.map((method: string, index: number) => (
    <Stack
      key={method}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 1,
        px: 2,
        ...(index > 0 && { borderTop: "1px solid #ddd" }),
        background: "#fafafa",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {method}
      </Typography>
      <Stack flexDirection="row" alignItems="center">
        <Button
          variant="contained"
          size="small"
          sx={{
            mr: 2,
            height: "30px",
            fontSize: "12px",
          }}
        >
          exec
        </Button>
        <FormControl variant="outlined" size="small" sx={{ ...inputStyle }}>
          <InputLabel>delay</InputLabel>
          <OutlinedInput
            type="number"
            label="delay"
            value={delay[index]}
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
        <FormControl variant="outlined" size="small" sx={{ ...inputStyle }}>
          <InputLabel>status</InputLabel>
          <Select
            label="status"
            size="small"
            value={status[index]}
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
