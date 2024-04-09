//This is signup screen
import imgLogin from '../assets/image_login.jpg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import CloseIcon from '@mui/icons-material/Close'
import 'bootstrap/dist/css/bootstrap.css'
import './signup.css'

function Signup() {
  return (
    <>
      <div className="container">
        <div className="image col-6">
          <img src={imgLogin} alt="Image" style={{ width:'439px' }}/>
        </div>
        <div className="content col-6">
          <h1>Sign Up</h1>

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

          <div className="input-box">
            <label>Re-password *</label>
            <br/>
            <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }}/>
            <input type="password" required/>
          </div>

          <div className="button">
            <button type="submit" className="button-login"><PersonAddAltIcon sx={{ paddingRight: '10px', fontSize: 40 }}/>Create</button>
            <button type="submit" className="button-cancel"><CloseIcon sx={{ paddingRight: '10px', fontSize: 40, color: 'red' }}/>Cancel</button>
          </div>

          <div className="forgot">
            <label>If you have an account <a href="/">Login now</a></label>
          </div>
        </div>
      </div>
    </>
  )
}
export default Signup
