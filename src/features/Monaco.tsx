import React, { useRef } from "react";
import { Box } from "@mui/material";
import Editor, { useMonaco } from "@monaco-editor/react";
import CircularProgress from "@mui/material/CircularProgress";

import type { editor } from "monaco-editor";
import type { Monaco, OnMount } from "@monaco-editor/react";

type MonacoProps = {
  language?: string;
  height?: number;
  value: string;
  schemas?: any[];
  boxStyle?: { [key: string]: string | number };
  options?: editor.IStandaloneEditorConstructionOptions;
  onChange?: (value?: string) => void;
  onValidate?: (value: editor.IMarker[]) => void;
};

const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
  fontSize: 13,
  tabSize: 2,
  minimap: { enabled: false },
  roundedSelection: true,
};

const Monaco = ({
  language = "json",
  height,
  value,
  boxStyle,
  schemas,
  onChange,
  onValidate,
  options,
}: MonacoProps) => {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  const onBeforeMount = (monaco: Monaco) => {
    schemas &&
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas,
      });
  };

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onChangeCode = () => {
    onChange && onChange(editorRef.current?.getValue());
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: 2,
        borderRadius: "4px",
        overflow: "hidden",
        background: "#1e1e1e",
        ...boxStyle,
      }}
    >
      <Editor
        height={300}
        theme={"vs-dark"}
        loading={<CircularProgress thickness={5} />}
        defaultLanguage={language}
        value={value}
        beforeMount={onBeforeMount}
        onMount={onMount}
        onChange={onChangeCode}
        onValidate={onValidate}
        options={{
          ...defaultOptions,
          ...options,
        }}
        {...(height && { height: height - 32 })}
      />
    </Box>
  );
};

export default Monaco;
