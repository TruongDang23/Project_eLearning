<<<<<<< HEAD
import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from './screens/course'
=======
import System from "./screens/system";
import { Admin } from "./screens/admin";
import { Instructor } from "./screens/teacher";
import { Student } from "./screens/student";
import InforCourse from "./screens/system/inforCourse/InforCourse";
import InforCourseData from "~/data/InforCourseData";
import AccessCourseData from "./data/AccessCourseData";
import AccessCourse from "./screens/student/accessCourse/AccessCourse";
>>>>>>> f247ec661b9bab9ba1cba87f857761002ab54c88

function App() {
  return (
    <>
      <System/>
      <Admin/>
      <Instructor/>
<<<<<<< HEAD
      <Student/>
      <Course/>
=======
      <Student/> */}
      {/* <InforCourse inforCourseData={InforCourseData} /> */}
      <AccessCourse accessCourseData={AccessCourseData} />
>>>>>>> f247ec661b9bab9ba1cba87f857761002ab54c88
    </>
  );
}

export default App;
