import React from "react";
import styled from "styled-components";
import MainContentAccessCourse from "./MainContentAccessCourse";
import SideBarAccessCourse from "./SideBarAccessCourse";

function MainAccessCourse({ accessCourseData }) {
  return (
    <MainAccessCourseWrapper className="white-space-small">
      <MainContentAccessCourse accessCourseData={accessCourseData} />
      <SideBarAccessCourse accessCourseData={accessCourseData} />
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
