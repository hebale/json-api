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

import { DialogContentContext } from "~/features/Dialogs";
import Viewer from "~/features/Viewer";
import Headers from "./Headers";

import type { editor } from "monaco-editor";
import type { JSONData } from "~/types/features";

const jsonData: JSONData = {
  path: "",
  description: "",
  headers: {},
  methods: [],
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

  const onChangeHeader = (headers: { [key: string]: string }) => {
    setCode((prev) => {
      return { ...prev, headers };
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
          code: {
            isActive: false,
            value: null,
          },
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

  const onResponseValidate = (marker: editor.IMarker[], value?: string) => {
    console.log(value);
    if (!marker.length) {
      setCode((prev) => {
        return { ...prev, response: value };
      });
    }
  };

  return (
    <Stack
      direction="row"
      gap={3}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Box sx={{ width: "50%" }}>
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
        <FormGroup>
          <FormLabel>Headers</FormLabel>
          <Headers onChange={onChangeHeader} />
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
        <FormGroup
          sx={{
            "& .MuiBox-root": {
              background: "#fff",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
            },
          }}
        >
          <FormLabel>Response</FormLabel>
          <Monaco value={"[]"} height={360} onValidate={onResponseValidate} />
        </FormGroup>
      </Box>

      <Box sx={{ width: "50%" }}>
        <FormGroup sx={{ height: "100%", flexWrap: "nowrap" }}>
          <FormLabel>JSON Data</FormLabel>
          <FormControl
            size="small"
            sx={{
              px: 2,
              width: "100%",
              height: "100%",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          >
            <Viewer value={JSON.stringify(code, null, 2)} />
          </FormControl>
        </FormGroup>
      </Box>
    </Stack>
  );
};

export default UploadForm;
