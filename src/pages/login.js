// import * as React from 'react';
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useLogInMutation } from '../features/api/apiSlice';
import { Spinner } from '../components/Spinner';
import Cookies from 'js-cookie';
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../features/users/usersSlice';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
    const [accountDetails, setAccountDetails] = React.useState({
        email: '',
        password: ''
    });
    const [login, isLoading] = useLogInMutation()
    let navigate = useNavigate();
    let content

     Cookies.remove("token");
    
  
   const dispatch=useDispatch()
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        if(isLoading){
            content=<Spinner text='Loading.....' />
          }
        login(accountDetails).unwrap()
            .then((payload) => {
                console.log('fulfilled', payload)
                if (payload.status) {
                    Cookies.set('token',payload.token,
                        // { sameSite: 'None' }
                    );
                    const token=JSON.parse(atob(payload.token.split('.')[1]));
                    Cookies.set('userDetails',JSON.stringify(token)
                    // ,{ sameSite: 'none' }
                );
                    let username=token.username;
                    let userId=token.userId
                   /*  dispatch(
                        addUser({
                           username: username,
                            userId:userId
                        })
                    ) */
                    console.log(token);
                    setAccountDetails({
                        email: '',
                        password: ''
                    });
                    window.location.reload();
                    navigate("/");
                }
            })
            .catch((error) => console.error('rejected', error))
      
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h6" variant="h6">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={accountDetails.email}
                            onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                            autoComplete="email"
                            size="small"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            value={accountDetails.password}
                            onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            size="small"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        {content&&content}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}