import styled from "styled-components";
import AssignmentTopic from "./AssignmentTopic";
import CodeEditor from "./CodeEditor";

function AssignmentContent({ title, question, sample, testcases }) {

  return (
    <AssignmentContentWrapper>
      <AssignmentTopic title={title} question={question} sample={sample} />
      <CodeEditor testcases={testcases} />
    </AssignmentContentWrapper>
  );
}

const AssignmentContentWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 1rem;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column layout for 768px */
  }

  @media (max-width: 468px) {
    grid-template-columns: 1fr; /* Single column layout for 468px */
    gap: 1rem; /* Adjust gap for smaller screens */
  }
`;

export default AssignmentContent;
