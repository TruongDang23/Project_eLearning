import styled from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <h1>The React Quiz</h1>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 66rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 5rem;
  }
`;

export default Header;
