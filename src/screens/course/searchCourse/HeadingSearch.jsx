import styled from "styled-components";

function HeadingSearch({ resultNumber, resultText }) {
  return (
    <HeadingSearchWrapper>
      <h1>
        {resultNumber} {resultText} found
      </h1>
    </HeadingSearchWrapper>
  );
}

const HeadingSearchWrapper = styled.section`
  h1 {
    font-size: 2.6rem;
    font-weight: 700;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

export default HeadingSearch;
