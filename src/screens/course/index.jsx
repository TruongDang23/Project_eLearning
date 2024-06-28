import { Route, Routes } from 'react-router-dom'
import InforCourse from "./inforCourse/InforCourse"
import InforCourseData from "~/data/InforCourseData"

export function Course () {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
          VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/course/infor' element={<InforCourse inforCourseData={InforCourseData} />} />
      </Routes>
    </>
  )
}