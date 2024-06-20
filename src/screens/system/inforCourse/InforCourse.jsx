import { HeaderAfterLogin } from "~/components/general";
import FooterNew from "~/components/general/Footer/FooterNew";
import InforCourseData from "./InforCourseData";
import IntroCourse from "./IntroCourse";


function InforCourse() {


  return (
    <div>
      <HeaderAfterLogin />
      <main>
        <IntroCourse InforCourse={InforCourseData} />
      </main>
      <FooterNew />
    </div>
  );
}

export default InforCourse;
