import styled from 'styled-components'
import Course from './Course'
import axios from 'axios'
import { useState, useEffect } from 'react'

const CourseListWrapper = styled.section`
  .courses {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2.4rem;
  }
  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
`

function CourseList() {
  const [courses, setCourse] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get('http://localhost:3000/s/loadCourseWelcome', {
      headers: {
        'Authorization': token // Thêm token vào header Authorization
      }
    })
      .then(response => {
        setCourse(response.data)
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
      })
  }, [])

  return (
    <CourseListWrapper className="container white-space-medium">
      <h2 className="heading-tertiary">Courses</h2>
      <div className="courses">
        {courses.map((course) => (
          <Course key={course.course_id} course={course} />
        ))}
      </div>
    </CourseListWrapper>
  )
}

export default CourseList
