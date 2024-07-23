import styled from "styled-components";
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "./Constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { useSearchParams, useParams } from "react-router-dom";

function CodeEditor({ testcases }) {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const params = useParams()
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page')
  const title = params.courseID + params.id + page
  const code = localStorage.getItem(title)

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
        defaultLanguage={language}
        defaultValue="// Write your code here"
        onMount={onMount}
        value={(code === null) ? value : code}
        onChange={(value) => setValue(value)}
      />
      <Output editorRef={editorRef} language={language} testcases={testcases} />
    </CodeEditorWrapper>
  );
}

const CodeEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #333537;
  border-radius: 5px;
  color: #e3e3e3;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);

  .header-editor {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default CodeEditor;
