// src/UserProfile.js
import { Items } from './CreatedItem'

function TerminatedCourse({ course, reload, setReload }) {
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem} reload={reload} setReload={setReload} />
      ))}
    </>
  )
}

export default TerminatedCourse;
