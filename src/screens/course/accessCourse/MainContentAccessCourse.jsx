import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import Quizz from "./Quizz";

import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";

import QuizzData from "~/data/QuizzData";

function MainContentAccessCourse({ accessCourseData, params }) {
  const type = params.get("type");
  const source = params.get("source");

  return (
    <MainAccessCourseWrapper>
      {type === "video" ? (
        <VideoPlayer video={source} />
      ) : type === "file" ? (
        <PdfViewer pdfUrl={source} />
      ) : type === "quizz" ? (
        <Quizz quizzData={QuizzData} />
      ) : (
        <p>Loading...</p>
      )}
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
