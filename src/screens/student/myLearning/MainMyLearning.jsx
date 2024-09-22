import styled from 'styled-components'
import CourseMyLearning from './CourseMyLearning'

function MainMyLearning({ dataCourseMyLearning }) {
  return (
    <MainMyLearningWrapper className="container">
      <div className="main-mylearning">
        <div className="course-list">
          {dataCourseMyLearning.map((course) => (
            <CourseMyLearning key={course.title} course={course} />
          ))}
        </div>
      </div>
    </MainMyLearningWrapper>
  )
}

const MainMyLearningWrapper = styled.section`
  .main-mylearning {
    .course-list {
      margin-top: 20px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 1.6rem;
    }
  }
`

export default MainMyLearning
