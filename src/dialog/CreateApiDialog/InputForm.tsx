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
  IconButton,
} from "@mui/material";
import Monaco from "~/features/Monaco";
import schema from "~/schema";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { DialogContentContext } from "~/features/Dialogs";
import type { JSONData } from "~/types/features";

const jsonData: JSONData = {
  apiPath: "",
  description: "",
  headers: {},
  methods: [],
  response: [],
};

// const headerForm = () => {
//   return (
//     <React.Fragment>
//       <FormControl size="small">
//         <OutlinedInput
//           placeholder="key"
//           defaultValue={""}
//           onChange={(e) => onChangePath(e.target.value)}
//         />
//       </FormControl>
//       <FormControl size="small">
//         <OutlinedInput
//           placeholder="value"
//           defaultValue={""}
//           onChange={(e) => onChangePath(e.target.value)}
//         />
//       </FormControl>
//       <IconButton onClick={() => {}} sx={{ color: "red" }}>
//         <RemoveCircleIcon />
//       </IconButton>
//     </React.Fragment>
//   );
// };

const UploadForm = () => {
  const setDatas = useContext(DialogContentContext);
  const [code, setCode] = useState(jsonData);
  const [headers, setHeaders] = useState({
    "Content-Type": "application/json",
  });

  useEffect(() => {
    setCode((prev) => {
      return { ...prev, headers };
    });
  }, [headers]);

  const onChangeDescription = (value: string) => {
    setCode((prev) => {
      return { ...prev, description: value };
    });
  };

  const onChangePath = (value: string) => {
    setCode((prev) => {
      return { ...prev, apiPath: value };
    });
  };

  const onChangeHeaders = () => {};

  const onClickRemoveHeader = (key: string) => {
    setHeaders((prev) => {
      delete prev[key];

      return prev;
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

  return (
    <Stack direction="row" gap={3} justifyContent="space-between">
      <Box sx={{ width: "40%" }}>
        <FormGroup>
          <FormLabel>Path</FormLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <OutlinedInput
              placeholder="ex) /user/info"
              defaultValue={""}
              onChange={(e) => onChangePath(e.target.value)}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <OutlinedInput
              defaultValue={""}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Headers</FormLabel>

          {Object.keys(headers).map((key) => {
            return (
              <Stack
                key={key}
                direction="row"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <FormControl size="small">
                  <OutlinedInput
                    placeholder="key"
                    defaultValue={""}
                    onChange={(e) => onChangePath(e.target.value)}
                  />
                </FormControl>
                <Box sx={{ mx: 0.6 }}>:</Box>
                <FormControl size="small">
                  <OutlinedInput
                    placeholder="value"
                    defaultValue={""}
                    onChange={(e) => onChangePath(e.target.value)}
                  />
                </FormControl>
                <IconButton
                  onClick={() => onClickRemoveHeader(key)}
                  sx={{ color: "red" }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Stack>
            );
          })}
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
            <FormControl key={method} size="small" sx={{ width: "25%" }}>
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
      </Box>

      <Box sx={{ width: "60%" }}>
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
            // onChange={(data) => console.log(data)}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export default UploadForm;
