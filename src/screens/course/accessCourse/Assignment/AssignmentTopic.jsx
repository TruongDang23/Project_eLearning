import styled from "styled-components";

function AssignmentTopic() {
  return (
    <AssignmentTopicWrapper>
      <h2>Assignment Topic</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
        condimentum odio. Phasellus sit amet volutpat urna. Sed nec condimentum
        odio. Phasellus sit amet volutpat urna.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
        condimentum odio. Phasellus sit amet volutpat urna. Sed nec condimentum
        odio. Phasellus sit amet volutpat urna.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
        condimentum odio. Phasellus sit amet volutpat urna. Sed nec condimentum
        odio. Phasellus sit amet volutpat urna.
      </p>
    </AssignmentTopicWrapper>
  );
}

const AssignmentTopicWrapper = styled.aside`
  width: 100%;
  height: 70vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 20px;
`;

export default AssignmentTopic;
