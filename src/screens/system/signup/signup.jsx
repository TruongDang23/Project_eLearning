//This is signup screen
import imgLogin from '../assets/image_login.jpg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import CloseIcon from '@mui/icons-material/Close'
import 'bootstrap/dist/css/bootstrap.css'
import './signup.css'
import { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'

function Signup() {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [repass, setRepass] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')

  const hashPassword = (password) => {
    return CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex)
  }

  const typeRepass = (e) => {
    setRepass(e.target.value)
    if (e.target.value !== pass) {
      setMessage('Password does not match')
    } else {
      setMessage('')
    }
  }

  const signup = async() => {
    try
    {
      if (message === 'Password does not match')
      {
        //
      }
      else
      {
        const hased = hashPassword(pass)
      }
    }
    catch (error)
    {
      //
    }
  }
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
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="input-box">
            <label>Password *</label>
            <br/>
            <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }}/>
            <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>

          <div className="input-box">
            <label>Re-password *</label>
            <br/>
            <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }}/>
            <input type="password" required value={repass} onChange={typeRepass} />
          </div>

          <div className="role">
            <label><input type="radio" value="Student" name="role" onChange={(e) => setRole(e.target.value)} ></input> Student</label>
            <label><input type="radio" value="Instructor" name="role" onChange={(e) => setRole(e.target.value)} ></input> Instructor</label>
            <label><input type="radio" value="Admin" name="role" onChange={(e) => setRole(e.target.value)} ></input> Admin</label>
          </div>

          {message && <p style={{ color: 'red', textAlign: 'center', paddingTop: '20px' }}>{message}</p>}

          <div className="button">
            <button className="button-login" onClick={signup}><PersonAddAltIcon sx={{ paddingRight: '10px', fontSize: 40 }}/>Create</button>
            <button className="button-cancel"><CloseIcon sx={{ paddingRight: '10px', fontSize: 40, color: 'red' }}/>Cancel</button>
          </div>

          <div className="forgot">
            <label>If you have an account <a href="/login">Login now</a></label>
          </div>
        </div>
      </div>
    </>
  )
}
export default Signup
