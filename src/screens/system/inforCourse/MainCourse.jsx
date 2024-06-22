import styled from "styled-components";
import MainContentCourse from "./MainContentCourse";
import SideBar from "./SideBar";

function MainCourse({ inforCourseData }) {
  return (
    <MainCourseWrapper className="container">
      <MainContentCourse inforCourseData={inforCourseData} />
      <SideBar inforCourseData={inforCourseData} />
    </MainCourseWrapper>
  );
}

const MainCourseWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export default MainCourse;
