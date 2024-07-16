import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import AssignmentTopic from "./Assignment/AssignmentTopic";
import CodeEditor from "./Assignment/CodeEditor";

import styled from "styled-components";

function Assignment() {
  return (
    <>
      <HeaderAfterLogin />
      <AssignmentWrapper>
        <AssignmentTopic />
        <CodeEditor />
      </AssignmentWrapper>
      <FooterNew />
    </>
  );
}

const AssignmentWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 1rem;
  width: 100%;
  gap: 1rem;
`;

export default Assignment;
