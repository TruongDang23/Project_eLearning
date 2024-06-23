import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import IntroCourse from "./IntroCourse";
import MainCourse from "./MainCourse";

function InforCourse({ inforCourseData }) {
  return (
    <div>
      <HeaderAfterLogin />
      <main>
        <IntroCourse inforCourseData={inforCourseData} />
        <MainCourse inforCourseData={inforCourseData} />
      </main>
      <FooterNew />
    </div>
  );
}

export default InforCourse;