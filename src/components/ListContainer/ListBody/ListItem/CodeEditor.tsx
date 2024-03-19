import React, { useState, useEffect, useRef } from "react";
import { Stack, FormControl, Button } from "@mui/material";

import CopyAllIcon from "@mui/icons-material/CopyAll";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import Editor, {
  Monaco,
  useMonaco,
  loader,
  EditorProps,
} from "@monaco-editor/react";

const defaultProps = {
  height: 300,
  defaultLanguage: "json",
  theme: "vs-dark",
};

const CodeEditor = ({ data }) => {
  const editorRef = useRef<null | Editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  const [codeData, setCodeData] = useState(data);

  useEffect(() => {
    if (monaco) {
      console.log("here", monaco);
    }
  }, [monaco]);

  const onMount = (editor) => {
    editorRef.current = editor;
  };

  const showValue = () => {
    console.log(editorRef.current?.getValue());
  };

  const onRefreshCode = () => {
    console.log(codeData, data);
    setCodeData(data);
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Button variant="contained" size="small" onClick={showValue}>
          copy
        </Button>
        <Button variant="contained" size="small" onClick={onRefreshCode}>
          refresh
        </Button>
        <Button variant="contained" size="small" onClick={showValue}>
          save
        </Button>
      </Stack>
      <Editor {...defaultProps} value={codeData} onMount={onMount} />
    </>
  );
};

export default CodeEditor;
