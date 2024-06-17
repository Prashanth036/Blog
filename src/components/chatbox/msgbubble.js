// src/App.js

import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import ChatBox from './chat';
import Cookies from 'js-cookie';


const MsgBubble = ({socket}) => {
  const  userDetails = Cookies.get("userDetails")?JSON.parse(Cookies.get("userDetails")):'';
  console.log(userDetails);
  return (
    // <Container>
    //   <CssBaseline />
    // <div style={{margin:'20px'}}>
      <ChatBox userDetails={userDetails} socket={socket}/>
    //   </div>
    // </Container>
  );
};

export default MsgBubble;
