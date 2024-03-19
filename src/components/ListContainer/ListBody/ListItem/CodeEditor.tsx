import React, { useEffect, useRef } from "react";
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
  console.log(data);

  const editorRef = useRef<null | Editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here", monaco);
    }
  }, [monaco]);

  const onMountMonaco = (editor) => {
    editorRef.current = editor;
  };

  const showValue = () => {
    console.log(editorRef.current?.getValue());
  };

  return (
    <>
      <button onClick={showValue}>show value</button>
      <Editor {...defaultProps} defaultValue={data} onMount={onMountMonaco} />
    </>
  );
};

export default CodeEditor;
