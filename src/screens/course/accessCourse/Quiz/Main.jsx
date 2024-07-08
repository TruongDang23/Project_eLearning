import styled from "styled-components";
function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}

const MainWrapper = styled.main`
  width: 50rem;
`;

export default Main;
