import styled from "styled-components";
import { GeneralHeader } from "~/components/general";
import { GeneralFooter } from "~/components/general";
import HeadingSearch from "./HeadingSearch";
import MainSearch from "./MainSearch";

function SearchCourse({ searchCourseData }) {
  const resultNumber = searchCourseData.length;
  const resultText = resultNumber > 1 ? "results" : "result";

  return (
    <>
      <GeneralHeader />
      <SearchCourseWrapper>
        <HeadingSearch resultNumber={resultNumber} resultText={resultText} />
        <MainSearch searchCourseData={searchCourseData} />
      </SearchCourseWrapper>
      <GeneralFooter />
    </>
  );
}

const SearchCourseWrapper = styled.main`
  width: 100%;
  max-width: 134rem;
  margin: 0 auto;
  padding: 4.6rem 2.4rem;
  display: flex;
  flex-direction: column;
`;

export default SearchCourse;
