import styled from "styled-components"
import MainContentAccessCourse from "./MainContentAccessCourse"
import SideBarAccessCourse from "./SideBarAccessCourse"
import { useSearchParams } from "react-router-dom"
function MainAccessCourse({ accessCourseData }) {
  const [searchParams, setSearchParams] = useSearchParams({
    type: accessCourseData.chapters[0].lectures[0].type,
    source: accessCourseData.chapters[0].lectures[0].source
  })

  return (
    <MainAccessCourseWrapper className="white-space-small">
      <MainContentAccessCourse accessCourseData={accessCourseData} params={searchParams} />
      <SideBarAccessCourse accessCourseData={accessCourseData} setParams={setSearchParams}/>
    </MainAccessCourseWrapper>
  );
}

const MainAccessCourseWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 1440px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export default MainAccessCourse;
