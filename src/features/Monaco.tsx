import React, { useRef } from "react";
import { Box } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import CircularProgress from "@mui/material/CircularProgress";

import type { editor } from "monaco-editor";
import type { OnMount } from "@monaco-editor/react";

type MonacoProps = {
  language?: string;
  height?: number;
  value: string;
  boxStyle?: { [key: string]: string | number };
  onChange?: (value?: string) => void;
  onValidate?: (value: editor.IMarker[]) => void;
};

const options = {
  height: 300,
  theme: "vs-dark",
  options: {
    fontSize: 13,
    tabSize: 2,
    minimap: { enabled: false },
  },
  roundedSelection: true,
};

const Monaco = ({
  language = "json",
  height,
  value,
  boxStyle,
  onChange,
  onValidate,
}: MonacoProps) => {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onChangeCode = () => {
    onChange && onChange(editorRef.current?.getValue());
  };

  return (
    <Box
      sx={{
        py: 2,
        borderRadius: "4px",
        overflow: "hidden",
        background: "#1e1e1e",
        ...boxStyle,
      }}
    >
      <Editor
        loading={<CircularProgress thickness={5} />}
        defaultLanguage={language}
        value={value}
        onMount={onMount}
        onChange={onChangeCode}
        onValidate={onValidate}
        {...options}
        {...(height && { height: height - 32 })}
      />
    </Box>
  );
};

export default Monaco;
