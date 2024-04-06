import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  Box,
  FormGroup,
  FormLabel,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Monaco from "~/features/Monaco";
import schema from "~/schema";

import { DialogContentContext } from "~/features/Dialogs";
import type { JSONData } from "~/types/features";
import HeaderTable from "./HeaderTable";

const jsonData: JSONData = {
  path: "",
  description: "",
  methods: [],
  headers: {},
  response: [],
};

const UploadForm = () => {
  const setDatas = useContext(DialogContentContext);
  const [code, setCode] = useState(jsonData);

  useEffect(() => {
    setDatas && setDatas("");
  }, []);

  const onChangeDescription = (value: string) => {
    setCode((prev) => {
      return { ...prev, description: value };
    });
  };

  const onChangePath = (value: string) => {
    setCode((prev) => {
      return { ...prev, path: value };
    });
  };

  const onChangeMethods = (e: React.ChangeEvent<HTMLInputElement>) => {
    const orders = ["GET", "POST", "PULL", "PATCH", "DELETE"];
    const { labels, checked } = e.target;

    if (!labels) return;

    setCode((prev) => {
      let methods: JSONData["methods"] = [...prev.methods];

      if (checked) {
        methods.push({
          method: labels[0].innerText as
            | "GET"
            | "POST"
            | "PULL"
            | "PATCH"
            | "DELETE",
          delay: 0,
          status: 200,
          code: null,
        });
      } else {
        methods = methods.filter(
          ({ method }) => method !== labels[0].innerText
        );
      }

      methods.sort(
        (a, b) => orders.indexOf(a.method) - orders.indexOf(b.method)
      );

      return { ...prev, methods };
    });
  };

  const onChangeHeader = (headers: { [key: string]: string }) => {
    setCode((prev) => {
      return { ...prev, headers };
    });
  };

  return (
    <Stack direction="row" gap={3} justifyContent="space-between">
      <Box sx={{ width: "60%" }}>
        <FormGroup>
          <FormLabel>
            Path
            <Typography
              component="span"
              color="error"
              sx={{ verticalAlign: "center" }}
            >
              *
            </Typography>
          </FormLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <OutlinedInput
              placeholder="/"
              defaultValue={""}
              onChange={(e) => onChangePath(e.target.value)}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <OutlinedInput
              placeholder=""
              defaultValue={""}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </FormControl>
        </FormGroup>
        <FormGroup
          sx={{
            display: "flex",
            mt: 0.5,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <FormLabel>Methods</FormLabel>
          {["GET", "POST", "PULL", "PATCH", "DELETE"].map((method) => (
            <FormControl key={method} size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{ fontSize: "12px" }}
                    onChange={onChangeMethods}
                  />
                }
                label={method}
              />
            </FormControl>
          ))}
        </FormGroup>
        <FormGroup>
          <FormLabel>Headers</FormLabel>
          <HeaderTable onChange={onChangeHeader} />
        </FormGroup>
      </Box>

      <Box sx={{ width: "40%" }}>
        <FormGroup>
          <FormLabel>JSON Data</FormLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <Monaco
              value={JSON.stringify(code, null, 2)}
              height={500}
              {...schema}
              options={{
                readOnly: true,
                readOnlyMessage: {
                  value: "읽기 전용입니다.",
                },
              }}
              onChange={(data) => setDatas && setDatas(data)}
            />
          </FormControl>
        </FormGroup>
      </Box>
    </Stack>
  );
};

export default UploadForm;
