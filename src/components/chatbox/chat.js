// src/ChatBox.js

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import { Chat, Close, ConnectWithoutContact, MarkAsUnreadRounded, Message, Send } from '@mui/icons-material';
import Cookies from "js-cookie"

const ChatBox = ({userDetails,socket}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatBoxVisible, setChatBoxVisible] = useState(true);
    const [newUserNotification, setNewUserNotification] = useState('');
    // console.log(userDetails);
    let isLoggedIn=Cookies.get('token');


    const handleSend = () => {
        if (input.trim()) {
            socket.emit("chats",{
                text: input,
                timestamp: new Date().toISOString(),
                // isUser: true,
                username: userDetails.username,
                type: 'message',
            });
            // setMessages([
            //     ...messages,
            //     {
            //         text: input,
            //         timestamp: new Date().toISOString(),
            //         isUser: true,
            //         username: 'You',
            //         type: 'message',
            //     },
            // ]);
            setInput('');
        }
    };

    // Simulate new users joining and sending messages
    useEffect(() => {
         socket.on("userJoined",(username)=>
            {
            setNewUserNotification(username)
            setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: `${username} has joined the chat`,
                            timestamp: new Date().toISOString(),
                            isUser: false,
                            username: username,
                            type: 'system',
                        },
                    ]);
                    setTimeout(() => setNewUserNotification(''), 1000);
         });
         socket.on("msgs",(msgs)=>setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: msgs.text,
                        timestamp: msgs.timestamp,
                        isUser: userDetails.username===msgs.username?true:false,
                        username:userDetails.username===msgs.username?"You": msgs.username,
                        type: 'message',
                    },
                ]));
        // const joinInterval = setInterval(() => {
        //     const randomUsername = otherUsernames[Math.floor(Math.random() * otherUsernames.length)];
        //     // setNewUserNotification(`${randomUsername} has joined the chat`);
        //     setMessages((prevMessages) => [
        //         ...prevMessages,
        //         {
        //             text: `${newUserNotification} has joined the chat`,
        //             timestamp: new Date().toISOString(),
        //             isUser: false,
        //             username: randomUsername,
        //             type: 'system',
        //         },
        //     ]);
        //     setTimeout(() => setNewUserNotification(''), 3000); // Clear notification after 3 seconds
        // }, 15000); // Every 15 seconds

        // const messageInterval = setInterval(() => {
        //     const randomUsername = otherUsernames[Math.floor(Math.random() * otherUsernames.length)];
        //     setMessages((prevMessages) => [
        //         ...prevMessages,
        //         {
        //             text: 'This is a message from another user',
        //             timestamp: new Date().toISOString(),
        //             isUser: false,
        //             username: randomUsername,
        //             type: 'message',
        //         },
        //     ]);
        // }, 10000); // Every 10 seconds

        // return () => {
        //     clearInterval(joinInterval);
        //     clearInterval(messageInterval);
        // };
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '40%', position: 'fixed', bottom: 0, right: 0 }}
        >


            <Paper elevation={3} sx={{ width: '100%', padding: '3px', marginBottom: 0, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'space-between'}}>
                    <MarkAsUnreadRounded sx={{ marginBottom: '-4px', marginLeft: "4px" }} />
                    Anonymous Chat
                    <Button
                    variant="contained"
                    color={isChatBoxVisible ?"primary":'error'}
                    onClick={() =>{ setChatBoxVisible(!isChatBoxVisible)
                        return socket.emit("user",userDetails.username)}}
                    sx={{}}
                    disabled={!isLoggedIn}
                    endIcon={isChatBoxVisible ?  <ConnectWithoutContact />:<Close /> }
                >
                    {isChatBoxVisible ?   'Connect':'Quit' }
                </Button>
                </Typography>
                
                {isChatBoxVisible ?"": <>

                    {newUserNotification && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                padding: 1,
                                borderRadius: 2,
                                zIndex: 1,
                            }}
                        >
                            <Typography variant="body1">{newUserNotification}</Typography>
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 300,
                            overflowY: 'scroll',
                            border: '1px solid #ccc',
                            padding: 1,
                            marginBottom: 2,
                            backgroundColor: '#fafafa',
                            borderRadius: 2,
                            position: 'relative',
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.isUser ? 'flex-end' : 'flex-start',
                                    marginBottom: 1,
                                }}
                            >
                                {msg.type === 'system' ? (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#888',
                                            fontStyle: 'italic',
                                            marginBottom: 1,
                                        }}
                                    >
                                        {msg.text}
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography variant="subtitle2" sx={{ color: msg.isUser ? '#1976d2' : '#555' }}>
                                            {msg.username}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                backgroundColor: msg.isUser ? '#1976d2' : '#e0e0e0',
                                                color: msg.isUser ? '#fff' : '#000',
                                                borderRadius: 2,
                                                padding: 1,
                                                maxWidth: '80%',
                                            }}
                                        >
                                            {msg.text}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666', marginTop: 0.5 }}>
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box display="flex" width="100%">
                        <TextField
                            variant="outlined"
                            label="Type a message"
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSend();
                                }
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginLeft: 1 }}>
                            Send
                        </Button>
                    </Box></>}
            </Paper>

        </Box>
    );
};

export default ChatBox;
