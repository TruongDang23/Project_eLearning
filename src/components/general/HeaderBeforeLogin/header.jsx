import './header.css'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="title">
          <ComputerOutlinedIcon sx={{ fontSize: '60px', color: '#187BCE', cursor: 'pointer' }}/>
          <h2>E-Learning</h2>
        </div>

        <div className="search">
          <TextField fullWidth id="outlined-basic" label={ <span> <SearchOutlinedIcon/>  Search for anythings....</span> } variant="outlined" />
        </div>

        <div className="button">
          <Button variant="outlined" href='/login'>Login</Button>
          <Button variant="contained" href='/signup'>Signup</Button>
        </div>

      </div>
    </>
  )
}

export default Header