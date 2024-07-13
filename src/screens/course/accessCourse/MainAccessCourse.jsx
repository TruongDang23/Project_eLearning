import styled from "styled-components"
import MainContentAccessCourse from "./MainContentAccessCourse"
import SideBarAccessCourse from "./SideBarAccessCourse"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

function MainAccessCourse({ accessCourseData }) {
  const userData = JSON.parse(localStorage.getItem('userAuth'))
  const [searchParams, setSearchParams] = useSearchParams({
    type: accessCourseData.chapters[0].lectures[0].type,
    source: accessCourseData.chapters[0].lectures[0].source
  })

  const [progress, setProgress] = useState({
    userID: userData.userID,
    courseID: accessCourseData.courseID,
    lectureID: '',
    percent: 0
  })
  return (
    <MainAccessCourseWrapper className="white-space-small">
      <MainContentAccessCourse accessCourseData={accessCourseData} params={searchParams} setProgress={setProgress}/>
      <SideBarAccessCourse accessCourseData={accessCourseData} setParams={setSearchParams} progress={progress} setProgress={setProgress}/>
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
