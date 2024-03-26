import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  ButtonGroup,
  Tooltip,
  IconButton,
  InputLabel,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import CopyButton from "~/features/CopyButton";
import Monaco from "~/features/Monaco";

import useAlert from "~/hooks/useAlert";
import { updateJsonData } from "~/api";

import type { editor } from "monaco-editor";

type EditorProps = {
  name?: string;
  value: string;
  height: number;
};

const Editor = ({ name, value, height }: EditorProps) => {
  const [code, setCode] = useState<string | null>(value ?? null);
  const [validate, setValidate] = useState<
    Pick<editor.IMarker, "endColumn" | "endLineNumber" | "message">[]
  >([]);
  const [isChanged, setIsChanged] = useState(false);

  const { openAlert } = useAlert();

  useEffect(() => {
    setIsChanged(value === code);
  }, [code]);

  const onSaveCode = async () => {
    if (validate.length) {
      return openAlert({
        type: "error",
        message: validate
          .map(
            ({ endLineNumber, endColumn, message }) =>
              `${endLineNumber}:${endColumn} ${message}`
          )
          .join("\n"),
      });
    }

    const response = await updateJsonData({ name, data: code });

    response
      ? openAlert({ type: "success", message: "저장 되었습니다" })
      : openAlert({
          type: "error",
          message: "오류가 발생했습니다. 다시 시도해 주세요.",
        });
  };

  const onValidateCode = (makers: editor.IMarker[]) => {
    setValidate(makers);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <InputLabel sx={{ fontSize: "14px" /* color: "#1976d2" */ }} shrink>
        Response Data
      </InputLabel>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ zIndex: -1, borderRadius: "4px 4px 0 0", background: "#1e1e1e" }}
      >
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            "> .MuiIconButton-root": { color: "#fff" },
            "> .MuiIconButton-root.Mui-disabled": { color: "#ffffff55" },
          }}
        >
          <CopyButton
            text={code}
            tooltip={{
              title: "Copy",
              placement: "top",
              arrow: true,
            }}
            onCopied={() =>
              openAlert({
                type: "info",
                message: "클립보드에 복사 되었습니다.",
              })
            }
          />
          <Tooltip title="Refresh" placement="top" arrow>
            <IconButton onClick={() => setCode(value)} disabled={isChanged}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" placement="top" arrow>
            <IconButton onClick={onSaveCode} disabled={isChanged}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      <Monaco
        value={code ?? ""}
        height={height}
        boxStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onChange={(data) => setCode(data ?? "")}
        onValidate={(makers) => onValidateCode(makers)}
      />
    </Box>
  );
};

export default Editor;
