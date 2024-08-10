import Information from './information/Information'
import ProfileStudent from './profile/ProfileStudent'
import userProfile from '~/data/UserInfor'
import { Route, Routes } from 'react-router-dom'

export function Student() {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
      VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path='/student/information' element={<Information />} />
        <Route path='/student/profile' element={<ProfileStudent userProfile={userProfile} />} />
      </Routes>
    </>
  )
}