// import * as React from 'react';
import React from 'react'
import  {Outlet} from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import { createTheme } from '@mui/material/styles'; // Import createTheme
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getLPTheme from "./getLpTheme";
import AppAppBar from '../app/Navbar';
import Hero from '../components/Hero';
import Testimonials from '../components/post';
import MsgBubble from '../components/chatbox/msgbubble';
import Cookies from "js-cookie"




function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage({setNotifs,socket}) {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  let isLoggedIn=Cookies.get('token');

  

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme }>
      <CssBaseline />
      {/* <App > */}
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} setNotifs={setNotifs} />
      <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 3%',
        backgroundRepeat: 'no-repeat',
      })}
    >
              <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
</Stack>
      <Outlet /> 
     {/* {isLoggedIn && */}
      <MsgBubble socket={socket}/> 
      {/* } */}
      </Box>
    {/*   <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
      {/* </App> */}
    </ThemeProvider>
  );
}