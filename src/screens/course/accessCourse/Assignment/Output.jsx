import styled from "styled-components";

function Output() {
  return (
    <OutputWrapper>
      <h2>Output</h2>
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
    </OutputWrapper>
  );
}

const OutputWrapper = styled.section`
  grid-column: 2 / 3;
  width: 100%;
  padding: 1rem;
`;

export default Output;
