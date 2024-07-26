import System from "./screens/system";
import { Admin } from "./screens/admin";
import { Instructor } from "./screens/teacher";
import { Student } from "./screens/student";
import { Course } from "./screens/course";

import Assignment from "./screens/course/accessCourse/Assignment";
import AssignmentData from "~/data/AssignmentData";
import SearchCourseData from "./data/SearchCourseData";
import SearchCourse from "./screens/course/searchCourse/SearchCourse";


function App() {
  return (
    <>
      <System />
      <Admin />
      <Instructor />
      <Student />
      <Course />
    {/* <SearchCourse searchCourseData={SearchCourseData} /> */}
    </>
  );
}

export default App;
