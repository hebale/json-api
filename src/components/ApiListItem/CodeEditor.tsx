import React, { useState, useEffect, useRef } from "react";
import { Stack, ButtonGroup, IconButton, Tooltip } from "@mui/material";

import CopyAllIcon from "@mui/icons-material/CopyAll";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import Editor, {
  Monaco,
  useMonaco,
  loader,
  EditorProps,
} from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { OnMount } from "@monaco-editor/react";

const defaultProps = {
  height: 300,
  defaultLanguage: "json",
  theme: "vs-dark",
};

const CodeEditor = ({ data }) => {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  const [isChanged, setIsChanged] = useState(false);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here", monaco);
    }
  }, [monaco]);

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const onCopyCode = () => {
    navigator.clipboard.writeText(editorRef.current?.getValue() ?? "");
  };

  const onRefreshCode = () => {
    editorRef.current?.setValue(data);
  };

  const onSaveCode = () => {
    console.log(editorRef.current?.getValue());
  };

  const onChangeCode = () => {
    setIsChanged(data === editorRef.current?.getValue());
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 4, background: "#1e1e1e" }}
      >
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            "> .MuiIconButton-root": { color: "#fff" },
            "> .MuiIconButton-root.Mui-disabled": { color: "#ffffff55" },
          }}
        >
          <Tooltip title="Copy" placement="top" arrow>
            <IconButton onClick={onCopyCode}>
              <CopyAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh" placement="top" arrow>
            <IconButton onClick={onRefreshCode}>
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
      <Editor
        {...defaultProps}
        value={data}
        onMount={onMount}
        onChange={onChangeCode}
        options={{
          padding: {
            top: 14,
            bottom: 14,
          },
          fontSize: 13,
          tabSize: 2,
          minimap: { enabled: false },
        }}
      />
    </>
  );
};

export default CodeEditor;
