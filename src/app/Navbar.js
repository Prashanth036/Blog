import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


// import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'


// import Link style={{textDecoration:'none'}}from '@mui/material/Link';

// import ToggleColorMode from './ToggleColorMode';


// import * as React from 'react';/
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser } from '../features/users/usersSlice';


function ToggleColorMode({ mode, toggleColorMode }) {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

// export default ToggleColorMode;

const logoStyle = {
  width: '50px',
  height: '50px',
  cursor: 'pointer',
  marginLeft: '30px',
  marginRight: '30px'
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  // console.log(users);


  let navigate = useNavigate();

  const dispatch = useDispatch();
  let userDetails
   if (Cookies.get("userDetails")) {
    userDetails = JSON.parse(Cookies.get("userDetails"));
  }
  // console.log(userDetails);
 
  let bools
  useEffect(()=>{
  if (userDetails) {
    
    let username =userDetails["username"]
    let userId = userDetails["userId"];
   dispatch(
      addUser({
        username: username,
        userId: userId
      })
    )
  }},[])



  let users = useSelector(state => state.users);

  if (bools) {
    // setDetails(!details)
  }
  /*  useEffect(()=>{
   console.log(users);
   },[]) */

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src="/logo192.png"
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem

                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    <Link style={{ textDecoration: 'none' }} to="/">  Home </Link>
                  </Typography>
                </MenuItem>
                {userDetails !== undefined ? <><MenuItem

                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    <Link style={{ textDecoration: 'none' }} underline="none" to="/posts">  Posts </Link>
                  </Typography>
                </MenuItem><MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                    <Typography variant="body2" color="text.primary">
                      Notifications
                    </Typography>
                  </MenuItem><MenuItem
                    onClick={() => scrollToSection('pricing')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Profile
                    </Typography>
                  </MenuItem></>
                : ''}
                
                {/* <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {userDetails !== undefined ?
                <><MenuItem
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    {users.username}
                  </Typography>
                </MenuItem><Button
                  color="primary"
                  variant="contained"
                  size="small"
                  // component="a"
                  onClick={() => {
                    Cookies.remove("userDetails")
                    Cookies.remove("token");
                   navigate("/login");
                   window.location.reload();
                   
                  }}
                >Log out</Button></>
                :
                <>
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  <Link style={{ textDecoration: 'none' }} to="/login">
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      component="a"
                    // href="/material-ui/getting-started/templates/sign-in/"
                    // target="_blank"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} to="/signup">
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      component="a"
                    // href="/material-ui/getting-started/templates/sign-up/"
                    // target="_blank"
                    >
                      Sign up
                    </Button>
                  </Link>
                 
                </>
              }
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                  <Link style={{ textDecoration: 'none' }} to="/">  Home </Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                  <Link style={{ textDecoration: 'none' }} underline="none" to="/posts">  Posts </Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Notifications
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Profile
                  </MenuItem>
                  {/* <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem> */}
                  <Divider />
                  <MenuItem>
                    <Link style={{ textDecoration: 'none' }} underline="none" to="/signup">
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        // href="/material-ui/getting-started/templates/sign-up/"
                        // target="_blank"
                        sx={{ width: '100%' }}
                      >
                        Sign up
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem><Link style={{ textDecoration: 'none' }} underline="none" to="/signup">
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      // href="/material-ui/getting-started/templates/sign-in/"
                      // target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;





