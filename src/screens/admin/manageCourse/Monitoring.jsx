// src/UserProfile.js
import { Items } from './MonitorItem'

function MonitoringCourse({ course }) {
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem}/>
      ))}
    </>
  )
}

export default MonitoringCourse;
