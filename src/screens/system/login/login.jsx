//This is login screen
import imgLogin from '../assets/image_login.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import brg from '../assets/background.webp'

function Login() {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const typeUsername = (e) => {
    setUsername(e.target.value)
    setMessage('')
  }

  const typePassword = (e) => {
    setPass(e.target.value)
    setMessage('')
  }

  const typeRole = (e) => {
    setRole(e.target.value)
    setMessage('')
  }

  const hashPassword = (password) => {
    return CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex)
  }

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:3000/s/loginWithGoogle', { loginCredential: response.credential })
      if (res.data === 'error')
        setMessage("An error occurred when logging in with Google!")
      else {
        const { token, userID, role } = res.data
        const userData = JSON.stringify({ userID, role })
        alert('Login successfully')
        localStorage.setItem('token', token)
        localStorage.setItem('userAuth', userData)
        navigate(`/`)
      }
    } catch (error) {
      alert('An error occurred while trying to log in.')
      //console.error(error)
    }
  }

  const handleFailure = () => {
    setMessage("An error occurred when logging in with Google!")
  }

  const checkLogin = async () => {
    try {
      const hassed = hashPassword(pass)
      const res = await axios.post('http://localhost:3000/s/login', { username, pass:hassed, role })
      if (res.data === 'User are not existed')
        setMessage('Username or Password is incorrect')
      else {
        const { token, userID, role } = res.data
        const userData = JSON.stringify({ userID, role })
        alert('Login successfully')
        localStorage.setItem('token', token)
        localStorage.setItem('userAuth', userData)
        navigate(`/`)
      }

    } catch (error) {
      alert('An error occurred while trying to log in.')
      //console.error(error)
    }
  }
  return (
    <>
      <LoginWrapper>
        <div className="wrapper">
          <div className="container">
            <div className="image col-6">
              <img src={imgLogin} alt="Image" style={{ width: '439px' }} />
            </div>
            <div className="content col-6">
              <h1>Login</h1>

              <div className="input-box">
                <label>Username/Email *</label>
                <br />
                <PersonOutlineIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }} />
                <input type="text" required value={username} onChange={typeUsername} />
              </div>

              <div className="input-box">
                <label>Password *</label>
                <br />
                <LockIcon sx={{ fontSize: 40, color: '#187BCE', paddingBottom: '2px' }} />
                <input type="password" required value={pass} onChange={typePassword} />
              </div>

              <div className="role">
                <label><input type="radio" value="Student" name="role" onChange={typeRole}></input> Student</label>
                <label><input type="radio" value="Instructor" name="role" onChange={typeRole}></input> Instructor</label>
                <label><input type="radio" value="Admin" name="role" onChange={typeRole}></input> Admin</label>
              </div>
              {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{message}</p>}
              <div className="button">
                <button onClick={checkLogin} className="button-login"><ExitToAppIcon sx={{ paddingRight: '10px', fontSize: 40 }} />Log in</button>
                <Link to='/'>
                  <button className="button-cancel"><CloseIcon sx={{ paddingRight: '10px', fontSize: 40, color: 'red' }} />Cancel</button>
                </Link>
              </div>

              <div className="forgot">
                <a href="#">Forgot Password</a>
              </div>
              <GoogleOAuthProvider clientId="801061480969-6i55dvk4l281orpnv8l4tde3t8d4jrn4.apps.googleusercontent.com">
                <div className="loginGoogle">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </div>
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </LoginWrapper>
    </>
  )
}

const LoginWrapper = styled.section`
.wrapper {
  position: relative; /* Required for positioning the pseudo-element */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${brg});
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(10px); /* Apply the blur effect */
  z-index: -1; /* Position the pseudo-element behind the content */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1084px;
  height: 581px;
  background-color: rgb(250, 250, 250);
  border-radius: 40px;
  overflow: hidden;
  padding-left: 0px;
  box-shadow: 0 4px 8px 0 rgba(70, 66, 127, 0.2), 0 6px 20px 0 rgba(59, 89, 135, 0.19);

  .content {

    h1 {
      color: #187BCE;
      text-align: center;
      font-family: Montserrat;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 69px;
    }

    .input-box {
      margin-bottom: 15px;

      label {
        color: #7A7A7A;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-family: Montserrat;
      }

      input {
        width: 460px;
        height: 40px;
        border-radius: 7px;
        border-width: 0;
        color: #187BCE;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-family: Montserrat;
        padding-left: 10px;
        background: rgba(243, 243, 250, 0.80);

        &:hover {
          border: 2px solid #187BCE;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3)
        }
      }
    }

    .role {
      display: flex;
      justify-content: space-between;
      color: #7A7A7A;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      width: 300px;
      margin: 0 auto;
      align-items: center;
    }

    .button {
      display: flex;
      width: 470px;
      margin: 0 auto;
      margin-top:40px;
      justify-content: space-between;

      .button-login {
        background-color: #187BCE;
        color: #FFF;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 220px;
        border:none;

        &:hover {
          background-color: #3489cf;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3)
        }
      }

      .button-cancel {
        background-color: #f3f3fa;
        color: #187BCE;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 220px;
        border:none;

        &:hover {
          background-color: #e1e1f8;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3)
        }
      }
    }

    .forgot {
      margin-top: 10px;
      margin-right: 35px;
      color: #7A7A7A;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-align: end;
    }

    .loginGoogle {
      width: 200px;
      height: 50px;
      margin: 20px auto;
    }
  }
}
`
export default Login