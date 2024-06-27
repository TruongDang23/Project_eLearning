import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import CourseBanner from "./CourseBanner";
import VideoPlayer from "./VideoPlayer";
import MainAccessCourse from "./MainAccessCourse";

function AccessCourse({ accessCourseData }) {
  return (
    <>
      <HeaderAfterLogin />
      <main>
        <CourseBanner accessCourseData={accessCourseData} />
        <MainAccessCourse accessCourseData={accessCourseData} />
      </main>
      <FooterNew />
    </>
  );
}

export default AccessCourse;
