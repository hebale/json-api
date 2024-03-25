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
  onChange: (value?: string) => void;
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
}: MonacoProps) => {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onChangeCode = () => {
    onChange(editorRef.current?.getValue());
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
        defaultLanguage={language}
        value={value}
        onMount={onMount}
        onChange={onChangeCode}
        loading={<CircularProgress thickness={5} />}
        {...options}
        {...(height && { height: height - 32 })}
      />
    </Box>
  );
};

export default Monaco;
