import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function AvatarAction({ setReload }) {
  const token = localStorage.getItem('token')
  const userAuth = localStorage.getItem('userAuth')
  const userData = JSON.parse(localStorage.getItem('userAuth'))
  const userID = userData ? userData.userID : ''
  const [avt, setAvt] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/s/loadAvatar', {
      params: {
        userID
      },
      headers: {
        'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
        'User': userAuth
      }
    })
      .then(response => {
        setAvt(response.data)
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403)
          navigate('/403error')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear()
    setReload(true)
    navigate('/')
  }

  const handleProfile = () => {
    (userID[0] === 'A') ? navigate('/Admin/information') :
      (userID[0] === 'S') ? navigate('/Student/information') :
        navigate('/Instructor/information')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={<h5>Information</h5>}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 35,
                height: 35,
                cursor: 'pointer',
                border: '2px solid #1971c2',
                marginLeft: '-20px'
              }}
              src={avt}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          sx={{ fontSize: "16px", color: '#333' }}
          onClick={() => {
            handleClose
          }}>
          <ListItemIcon>
            <SpaceDashboardOutlinedIcon fontSize="large" />
          </ListItemIcon> Dashboard
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "16px", color: '#333' }}
          onClick={() => {
            handleProfile()
            handleClose
          }}>
          <ListItemIcon>
            <AccountBoxOutlinedIcon fontSize="large" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ fontSize: "16px", color: '#333' }}
          onClick={handleClose}>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="large" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "16px", color: '#333' }}
          onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "16px", color: '#333' }}
          onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="large" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}