import System from "./screens/system";
import { Admin } from "./screens/admin";
import { Instructor } from "./screens/teacher";
import { Student } from "./screens/student";
import InforCourse from "./screens/system/inforCourse/InforCourse";
function App() {
  return (
    <>
      {/* <System/>
      <Admin/>
      <Instructor/>
      <Student/> */}
      <InforCourse />
    </>
  );
}

export default App;
