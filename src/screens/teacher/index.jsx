import Information from './information/Information'
import { Route, Routes } from 'react-router-dom'

export function Instructor() {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
      VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/instructor/information' element={<Information />} />
      </Routes>
    </>
  )
}