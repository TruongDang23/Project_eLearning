import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import CourseBanner from "./CourseBanner";
import VideoPlayer from "./VideoPlayer";

function AccessCourse({ accessCourseData }) {
  return (
    <>
      <HeaderAfterLogin />
      <main>
        <CourseBanner accessCourseData={accessCourseData} />
        <VideoPlayer video={accessCourseData.video_introduce} />
      </main>
      <FooterNew />
    </>
  );
}

export default AccessCourse;
