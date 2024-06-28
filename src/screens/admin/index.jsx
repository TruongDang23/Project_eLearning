import Information from './information/Information'
import ManageCourse from './manageCourse/MainManage'
import { Route, Routes } from 'react-router-dom'

export function Admin() {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
      VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/admin/information' element={<Information />} />
        <Route path='/admin/manageCourse' element={<ManageCourse />} />
      </Routes>
    </>
  )
}