//This is login screen
import imgLogin from '../assets/image_login.jpg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import 'bootstrap/dist/css/bootstrap.css'
import './login.css'

function Login() {
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
            <br/>
            <PersonOutlineIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }}/>
            <input type="text" required/>
          </div>

          <div className="input-box">
            <label>Password *</label>
            <br/>
            <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }}/>
            <input type="password" required/>
          </div>

          <div className="role">
            <label><input type="radio" value="Student" name="role"></input> Student</label>
            <label><input type="radio" value="Instructor" name="role"></input> Instructor</label>
            <label><input type="radio" value="Admin" name="role"></input> Admin</label>
          </div>

          <div className="button">
            <button type="submit" className="button-login"><ExitToAppIcon sx={{ paddingRight: '10px', fontSize: 40 }}/>Log in</button>
            <button type="submit" className="button-cancel"><CloseIcon sx={{ paddingRight: '10px', fontSize: 40, color: 'red' }}/>Cancel</button>
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
