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
      <TitleAssignment name={name} />
      <AssignmentContent topics={topics} />
      <FooterNew />
    </>
  );
}

const AssignmentWrapper = styled.main``;

export default Assignment;
