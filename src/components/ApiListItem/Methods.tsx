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

import type { ApiListItem } from "~/types/components";

type FormData = {
  delay: number;
  status: number;
};

const Methods = ({
  headers,
  methods,
}: Omit<ApiListItem, "name" | "data">): JSX.Element[] => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const onChangeDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
    }));
  };

  const onChangeStatus = (e: SelectChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
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
              onChange={onChangeDelay}
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>status</InputLabel>
            <Select
              label="status"
              defaultValue={status}
              sx={{ height: "30px" }}
              onChange={onChangeStatus}
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
