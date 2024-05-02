import React, { useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import Editor, { useMonaco } from '@monaco-editor/react';
import CircularProgress from '@mui/material/CircularProgress';

import type { editor } from 'monaco-editor';
import type { Monaco, OnMount } from '@monaco-editor/react';

type MonacoProps = {
  language?: string;
  height?: number | 'auto';
  value: string;
  schemas?: any[];
  boxStyle?: { [key: string]: string | number };
  options?: editor.IStandaloneEditorConstructionOptions;
  onChange?: (value?: string) => void;
  onValidate?: (marker: editor.IMarker[], value?: string) => void;
};

const Monaco = ({
  language = 'json',
  height = 'auto',
  value,
  boxStyle,
  schemas,
  onChange,
  onValidate,
  options,
}: MonacoProps) => {
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  const autoHeight = useCallback(() => {
    const editor = editorRef.current;

    if (!editor) return;
    const container = editor.getDomNode();
    const contentWidth = editor.getContainerDomNode().clientWidth;
    const contentHeight =
      typeof height === 'string'
        ? editor.getContentHeight()
        : Math.min(height, editor.getContentHeight() ?? height);

    (container as HTMLElement).style.height = `${contentHeight}px`;

    editor.layout({ width: contentWidth, height: contentHeight });
  }, [height]);

  const onBeforeMount = (monaco: Monaco) => {
    schemas &&
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas,
      });
  };

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidContentSizeChange(autoHeight);
  };

  const onChangeCode = () => {
    onChange && onChange(editorRef.current?.getValue());
  };

  return (
    <Box
      sx={{
        position: 'relative',
        pb: 3,
        borderRadius: '4px',
        overflow: 'hidden',
        background: '#1e1e1e',
        ...boxStyle,
      }}
    >
      <Editor
        theme={'vs-dark'}
        loading={<CircularProgress thickness={5} />}
        defaultLanguage={language}
        value={value}
        beforeMount={onBeforeMount}
        onMount={onMount}
        onChange={onChangeCode}
        onValidate={(marker) =>
          onValidate && onValidate(marker, editorRef.current?.getValue())
        }
        options={{
          fontSize: 13,
          tabSize: 2,
          minimap: { enabled: false },
          roundedSelection: true,
          scrollBeyondLastLine: false,
          ...options,
        }}
        {...(height !== 'auto' && { height })}
      />
    </Box>
  );
};

export default Monaco;
