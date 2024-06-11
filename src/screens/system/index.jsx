import { Route, Routes } from 'react-router-dom'
import Signup from './signup/signup'
import Login from './login/login'
import Welcome from './welcome/welcome'

/* index.jsx của các folder: system, admin, student, teacher có nhiệm vụ
  tạo route để hiển thị các màn hình tương ứng theo từng folder */

// Sử dụng thư viện react-router-dom để tạo các route
function System () {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
        VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/signup' element = {<Signup/>} />
        <Route path = '/' element = {<Welcome/>} />
      </Routes>
    </>
  )
}

export default System