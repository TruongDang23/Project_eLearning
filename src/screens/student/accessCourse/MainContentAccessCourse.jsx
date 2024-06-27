import React from "react";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";

import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";

function MainContentAccessCourse({ accessCourseData }) {
  const pdfUrl = accessCourseData.chapters[0].lectures[1].source;
  console.log(pdfUrl);
  return (
    <MainAccessCourseWrapper>
      {/* <VideoPlayer video={accessCourseData.video_introduce} /> */}
      <PdfViewer pdfUrl={pdfUrl} />
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
