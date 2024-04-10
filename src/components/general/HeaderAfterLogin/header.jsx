import './header.css'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import TextField from '@mui/material/TextField'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import NotificationsIcon from '@mui/icons-material/Notifications'

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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon fontSize='large'/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon fontSize='large'/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle fontSize='large'/>
            </IconButton>
          </Box>
        </div>

      </div>
    </>
  )
}

export default Header