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
  background-color: #f0f4f9;
  margin-left: 1rem;
  padding: 1rem;
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
`;

export default AssignmentTopic;
