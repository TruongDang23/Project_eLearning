// src/UserProfile.js
import { Items } from './TerminateItem'

function TerminatedCourse({ course }) {
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem}/>
      ))}
    </>
  )
}

export default TerminatedCourse;
