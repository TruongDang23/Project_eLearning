import styled from 'styled-components'
import Course from './Course'
import course_images from '../assets/images'
import axios from 'axios'

const CourseData = [
  {
    course_id: 'C001',
    title: 'React for Beginners',
    price: 49.99,
    rating_star: 4.5,
    rating_count: 100,
    imgSrc: 'https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0',
    creater: 'John Doe'
  },
  {
    course_id: 'C002',
    title: 'Node.js for Beginners',
    price: 59.99,
    rating_star: 4.7,
    rating_count: 120,
    imgSrc: course_images.img_course2,
    creater: 'Jonelle Doe'
  },
  {
    course_id: 'C003',
    title: 'MongoDB for Beginners',
    price: 69.99,
    rating_star: 4.8,
    rating_count: 130,
    imgSrc: course_images.img_course3,
    creater: 'Mary Doe'
  },
  {
    course_id: 'C004',
    title: 'SQL for Beginners: Learn SQL using MySQL and Database Design',
    price: 79.99,
    rating_star: 4.9,
    rating_count: 140,
    imgSrc: course_images.img_course4,
    creater: 'Micale Jackson'
  },
  {
    course_id: 'C005',
    title: 'MERN Stack for Beginners',
    price: 89.99,
    rating_star: 3.0,
    rating_count: 150,
    imgSrc: course_images.img_course5,
    creater: 'Erling Haaland'
  },
  {
    course_id: 'C006',
    title: 'Live Accounting App by C# .NET Core in Windows Forms and SQL',
    price: 99.99,
    rating_star: 5.0,
    rating_count: 160,
    imgSrc: course_images.img_course6,
    creater: 'Goerge Best'
  }
]

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
  return (
    <CourseListWrapper className="container white-space-medium">
      <h2 className="heading-tertiary">Courses</h2>
      <div className="courses">
        {CourseData.map((course) => (
          <Course key={course.course_id} course={course} />
        ))}
      </div>
    </CourseListWrapper>
  )
}

export default CourseList
