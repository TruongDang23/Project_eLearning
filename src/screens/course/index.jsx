import { Route, Routes } from 'react-router-dom'
import InforCourse from "./inforCourse/InforCourse"
import AccessCourse from './accessCourse/AccessCourse'
import AccessCourseData from "~/data/AccessCourseData"

export function Course () {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
          VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/course/infor/:courseID' element={<InforCourse />} />
        <Route path='/course/details/:courseID' element={<AccessCourse accessCourseData={AccessCourseData}/>} />
      </Routes>
    </>
  )
}