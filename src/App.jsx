import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import AccessCourseData from "./data/AccessCourseData"
import AccessCourse from "./screens/student/accessCourse/AccessCourse"

function App() {
  return (
    <>
      <System/>
      <Admin/>
      <Instructor/>
      <Student/>
      <Course/>
      {/* <AccessCourse accessCourseData={AccessCourseData} /> */}
    </>
  );
}

export default App;
