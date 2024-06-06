//This is login screen
import imgLogin from '../assets/image_login.jpg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import 'bootstrap/dist/css/bootstrap.css'
import './login.css'
import { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

function Login() {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [role, setRole] = useState('')

  const hashPassword = (password) => {
    return CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex)
  }

  const checkLogin = async () => {
    try {
      const hassed = hashPassword(pass)
      const res = await axios.post('http://localhost:3000/s/login', { username, pass:hassed, role })

      if (res.data === 'User are not existed')
        alert('Username or Password is incorrect')
      else
        alert('Login successfully with: ' + res.data[0].userID + ', status: ' + res.data[0].activity_status)
    } catch (error) {
      alert('An error occurred while trying to log in.')
      //console.error(error)
    }
  }
  return (
    <>
      <div className="container">
        <div className="image col-6">
          <img src={imgLogin} alt="Image" style={{ width:'439px' }}/>
        </div>
        <div className="content col-6">
          <h1>Login</h1>

          <div className="input-box">
            <label>Username/Email *</label>
            <br />
            <PersonOutlineIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }} />
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="input-box">
            <label>Password *</label>
            <br />
            <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }} />
            <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>

          <div className="role">
            <label><input type="radio" value="Student" name="role" onChange={(e) => setRole(e.target.value)}></input> Student</label>
            <label><input type="radio" value="Instructor" name="role" onChange={(e) => setRole(e.target.value)}></input> Instructor</label>
            <label><input type="radio" value="Admin" name="role" onChange={(e) => setRole(e.target.value)}></input> Admin</label>
          </div>

          <div className="button">
            <button onClick={checkLogin} className="button-login"><ExitToAppIcon sx={{ paddingRight: '10px', fontSize: 40 }} />Log in</button>
            <button className="button-cancel"><CloseIcon sx={{ paddingRight: '10px', fontSize: 40, color: 'red' }} />Cancel</button>
          </div>

          <div className="forgot">
            <a href="#">Forgot Password</a>
          </div>

        </div>
      </div>
    </>
  )
}
export default Login
