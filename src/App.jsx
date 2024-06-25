import System from "./screens/system";
import { Admin } from "./screens/admin";
import { Instructor } from "./screens/teacher";
import { Student } from "./screens/student";
import InforCourse from "./screens/system/inforCourse/InforCourse";
import InforCourseData from "~/data/InforCourseData";
import AccessCourseData from "./data/AccessCourseData";
import AccessCourse from "./screens/student/accessCourse/AccessCourse";

function App() {
  return (
    <>
      {/* <System/>
      <Admin/>
      <Instructor/>
      <Student/> */}
      {/* <InforCourse inforCourseData={InforCourseData} /> */}
      <AccessCourse accessCourseData={AccessCourseData} />
    </>
  );
}

export default App;
