import styled from 'styled-components'

function MainDesignCourse() {
  return (
    <MainAccessCourseWrapper>
      Đây là phần nội dung chính của trang thiết kế khóa học
    </MainAccessCourseWrapper>
  )
}

const MainAccessCourseWrapper = styled.section`
  width: 100%;
  background-color: #f9f9;
  height: 100vh;
`

export default MainDesignCourse
