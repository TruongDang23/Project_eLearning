import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import Quizz from "./Quizz";

import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";

function MainContentAccessCourse({ accessCourseData, params, setProgress }) {
  const type = params.get("type")
  const source = params.get("source")
  let quizz;

  if (type === 'quizz') {
    const id = params.get("id")
    for (const chapter of accessCourseData.chapters) {
      quizz = chapter.lectures.find(lecture => lecture.id == id);
      if (quizz) break;
    }
  }
  return (
    <MainAccessCourseWrapper>
      {type === "video" ? (
        <VideoPlayer video={source} setProgress={setProgress}/>
      ) : type === "file" ? (
        <PdfViewer pdfUrl={source} setProgress={setProgress}/>
      ) : type === "quizz" ? (
        <Quizz quizzData={quizz} setProgress={setProgress}/>
      ) : (
        <p>Loading...</p>
      )}
      <TabviewAccessCourse accessCourseData={accessCourseData} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
