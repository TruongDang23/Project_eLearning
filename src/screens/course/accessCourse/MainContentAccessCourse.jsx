import React from "react";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import Quizz from "./Quiz/Quizz";

import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";

function MainContentAccessCourse({ accessCourseData, lecture }) {
  const type = lecture.type
  return (
    <MainAccessCourseWrapper>
      {
        type === 'video' ?
          ( <VideoPlayer video={lecture.source} /> ) :
          type === 'file' ?
            ( <PdfViewer pdfUrl={lecture.source} /> ) :
            type === 'quizz' ?
              ( <Quizz /> ) : ( <p>Loading...</p> )
      }
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
