import System from "./screens/system";
import { Admin } from "./screens/admin";
import { Instructor } from "./screens/teacher";
import { Student } from "./screens/student";
import { Course } from "./screens/course";
import Assignment from "./screens/course/accessCourse/Assignment";
import AssignmentData from "~/data/AssignmentData";

function App() {
  return (
    <>
      {/* <System />
      <Admin />
      <Instructor />
      <Student />
      <Course /> */}
      <Assignment assignmentData={AssignmentData} />
    </>
  );
}

export default App;
