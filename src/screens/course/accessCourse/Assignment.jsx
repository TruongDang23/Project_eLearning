import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import TitleAssignment from "./Assignment/TitleAssignment";
import styled from "styled-components";
import AssignmentContent from "./Assignment/AssignmentContent";

function Assignment({ assignmentData }) {
  const { name, topics } = assignmentData;

  return (
    <>
      <HeaderAfterLogin />
      <AssignmentWrapper>
        <TitleAssignment name={name} />
        <AssignmentContent topics={topics} />
      </AssignmentWrapper>
      {/* <FooterNew /> */}
    </>
  );
}

const AssignmentWrapper = styled.main`
  background-color: black;
`;

export default Assignment;
