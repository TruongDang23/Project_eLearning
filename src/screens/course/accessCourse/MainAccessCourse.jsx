import styled from "styled-components"
import MainContentAccessCourse from "./MainContentAccessCourse"
import SideBarAccessCourse from "./SideBarAccessCourse"
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function MainAccessCourse({ accessCourseData, setReload }) {
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const userData = JSON.parse(localStorage.getItem('userAuth'))
  const [searchParams, setSearchParams] = useSearchParams({
    id: accessCourseData.chapters[0].lectures[0].id,
    type: accessCourseData.chapters[0].lectures[0].type,
    source: accessCourseData.chapters[0].lectures[0].source
  })

  const [progress, setProgress] = useState({
    userID: userData.userID,
    courseID: accessCourseData.courseID,
    lectureID: searchParams.get('id'),
    percent: 0
  })

  useEffect(() => {
    axios.post('http://localhost:3000/c/updateNewProgress',
      {
        progress
      },
      {
        headers: {
          'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
          'user': userAuth
        }
      })
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        setReload((prev) => ({
          reload: !prev.reload
        }))
      })
      .catch(error => {
        alert('Lỗi đọc dữ liệu: ' + error)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.percent])

  return (
    <MainAccessCourseWrapper className="white-space-small">
      <MainContentAccessCourse accessCourseData={accessCourseData} params={searchParams} setProgress={setProgress}/>
      <SideBarAccessCourse accessCourseData={accessCourseData} setParams={setSearchParams} setProgress={setProgress}/>
    </MainAccessCourseWrapper>
  );
}

const MainAccessCourseWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 1440px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export default MainAccessCourse;