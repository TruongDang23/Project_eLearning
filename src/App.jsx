import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import { SessionProvider } from "./context/SessionContext"

function App() {
  return (
    <>
      <SessionProvider>
        <System />
        <Admin />
        <Instructor />
        <Student />
        <Course />
      </SessionProvider>
    </>
  );
}

export default App;

