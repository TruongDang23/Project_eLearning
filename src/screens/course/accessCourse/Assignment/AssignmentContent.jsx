import styled from "styled-components";
import AssignmentTopic from "./AssignmentTopic";
import CodeEditor from "./CodeEditor";
import { Pagination } from "@mui/material";

function AssignmentContent({ topics }) {
  return (
    <AssignmentContentWrapper>
      <AssignmentTopic />
      <CodeEditor />
    </AssignmentContentWrapper>
  );
}

const AssignmentContentWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 1rem;
  width: 100%;
  gap: 2rem;
`;

export default AssignmentContent;
