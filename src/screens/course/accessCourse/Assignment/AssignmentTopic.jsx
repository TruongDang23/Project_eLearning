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
  padding: 1rem;
  overflow-y: auto;
  border-left: 1px solid #ccc;
`;

export default AssignmentTopic;
