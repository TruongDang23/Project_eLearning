import styled from "styled-components";
function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-top: 1rem;
`;

export default Main;
