import Information from './information/Information'
import ProfileInstructor from './profile/ProfileInstructor'
import DashboardInstructor from './dashboard/Dashboard'
import ManageCourse from './manageCourse/MainManage'
import { Route, Routes } from 'react-router-dom'

export function Instructor() {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
      VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/instructor/information' element={<Information />} />
        <Route path='/instructor/dashboard' element={<DashboardInstructor />} />
        <Route path='/instructor/profile' element={<ProfileInstructor />} />
        <Route path="/instructor/manageCourse" element={<ManageCourse/>} />
      </Routes>
    </>
  )
}