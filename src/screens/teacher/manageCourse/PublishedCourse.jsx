// src/UserProfile.js
import { Items } from './PublishedItem'

function PublishedCourse({ course }) {
  return (
    <>
      {course.map((courseItem) => (
        <Items key={courseItem.courseID} courseItem={courseItem}/>
      ))}
    </>
  )
}

export default PublishedCourse;
