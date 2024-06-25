import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import CourseBanner from "./CourseBanner";

function AccessCourse({ accessCourseData }) {
  return (
    <>
      <HeaderAfterLogin />
      <main>
        <CourseBanner accessCourseData={accessCourseData} />
        <h1>AccessCourse</h1>
      </main>
      <FooterNew />
    </>
  );
}

export default AccessCourse;
