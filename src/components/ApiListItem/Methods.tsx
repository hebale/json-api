import React, { useState } from "react";
import {
  Stack,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

import { updateJsonMethod } from "~/api";

import useAlert from "~/hooks/useAlert";
import type { ApiListItem } from "~/types/components";

type FormData = {
  delay: number;
  status: number;
};

const Methods = ({
  name,
  headers,
  methods,
}: Omit<ApiListItem, "data">): JSX.Element[] => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const { openAlert } = useAlert();

  const onChangeDelay = async (
    e: React.ChangeEvent<HTMLInputElement>,
    method: string
  ) => {
    const response = await updateJsonMethod({
      name,
      method,
      delay: Number(e.target.value),
    });

    !response &&
      openAlert({
        type: "error",
        message: "오류가 발생했습니다. 다시 시도해 주세요.",
      });
  };

  const onChangeStatus = async (
    e: SelectChangeEvent<HTMLSelectElement>,
    method: string
  ) => {
    console.log(method);

    const response = await updateJsonMethod({
      name,
      method,
      status: e.target.value,
    });

    !response &&
      openAlert({
        type: "error",
        message: "오류가 발생했습니다. 다시 시도해 주세요.",
      });
  };

  return methods.map(({ method, delay, status }, index) => (
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
      <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
        {method}
      </Typography>

      <Stack flexDirection="row" alignItems="center">
        <Button size="small">code</Button>

        <FormGroup
          row={true}
          sx={{
            "& .MuiFormControl-root": {
              width: 80,
            },
            "& .MuiFormControl-root + .MuiFormControl-root": {
              ml: 1,
            },
          }}
        >
          <FormControl variant="outlined" size="small">
            <InputLabel>delay</InputLabel>
            <OutlinedInput
              type="number"
              label="delay"
              defaultValue={delay}
              inputProps={{
                min: 0,
                step: 100,
              }}
              sx={{ height: "30px" }}
              onChange={(e) => onChangeDelay(e, method)}
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>status</InputLabel>
            <Select
              label="status"
              defaultValue={status}
              sx={{ height: "30px" }}
              onChange={(e) => onChangeStatus(e, method)}
            >
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={401}>401</MenuItem>
              <MenuItem value={403}>403</MenuItem>
              <MenuItem value={404}>404</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={505}>505</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </Stack>
    </Stack>
  ));
};

export default Methods;
