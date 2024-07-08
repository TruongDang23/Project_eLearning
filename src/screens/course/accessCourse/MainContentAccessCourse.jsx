import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import Quizz from "./Quiz/Quizz";

import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";

function MainContentAccessCourse({ accessCourseData, params }) {
  const type = params.get('type')
  const source = params.get('source')
  return (
    <MainAccessCourseWrapper>
      {
        type === 'video' ?
          ( <VideoPlayer video={source} /> ) :
          type === 'file' ?
            ( <PdfViewer pdfUrl={source} /> ) :
            type === 'quizz' ?
              ( <Quizz /> ) : ( <p>Loading...</p> )
      }
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
