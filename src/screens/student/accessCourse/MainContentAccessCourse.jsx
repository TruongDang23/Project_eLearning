import React from "react";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import TabviewAccessCourse from "./TabviewAccessCourse";

function MainContentAccessCourse({ accessCourseData }) {
  return (
    <MainAccessCourseWrapper>
      <VideoPlayer video={accessCourseData.video_introduce} />
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section`
`;

export default MainContentAccessCourse;
