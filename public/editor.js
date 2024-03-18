import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";

const config = {
  doc: "hello world",
  extensions: [basicSetup, json()],
  parent: document.body,
};

export default new EditorView(config);
