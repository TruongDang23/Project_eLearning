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
  height: 40rem;
  color: #e3e3e3;
  background-color: #333537;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
`;

export default AssignmentTopic;
