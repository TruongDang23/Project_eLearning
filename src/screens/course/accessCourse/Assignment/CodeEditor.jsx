import styled from "styled-components";
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "./Constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

function CodeEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <CodeEditorWrapper>
      <div className="header-editor">
        <LanguageSelector language={language} onSelect={onSelect} />
      </div>
      <Editor
        height="50rem"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <Output editorRef={editorRef} language={language} />
    </CodeEditorWrapper>
  );
}

const CodeEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  .header-editor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export default CodeEditor;
