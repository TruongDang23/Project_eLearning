// src/UserProfile.js
import { Items } from './PendingItem'

function PendingCourse({ course, reload, setReload }) {
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem} reload={reload} setReload={setReload} />
      ))}
    </>
  )
}

export default PendingCourse;
