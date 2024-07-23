import styled from "styled-components";
import FilterCourse from "./FilterCourse";
import ResultCourse from "./ResultCourse";

function MainSearch({ searchCourseData }) {
  return (
    <MainSearchWrapper>
      <FilterCourse searchCourseData={searchCourseData} />
      <ResultCourse searchCourseData={searchCourseData} />
    </MainSearchWrapper>
  );
}

const MainSearchWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
`;

export default MainSearch;
