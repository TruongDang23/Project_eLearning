import styled from "styled-components";

function AssignmentTopic() {
  return (
    <AssignmentTopicWrapper>
      <h2>Assignment Topic</h2>
      
    </AssignmentTopicWrapper>
  );
}

const AssignmentTopicWrapper = styled.aside`
  width: 100%;
  height: 70vh;
  padding: 1rem;
  overflow-y: auto;
  border-left: 1px solid #ccc;
`;

export default AssignmentTopic;
