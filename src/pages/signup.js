
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignUpMutation } from '../features/api/apiSlice';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';



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

export default function SignUp() {
  const [createUser, setCreateUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    username: ''
  })
  const [signUp, isLoading] = useSignUpMutation();
  let navigate=useNavigate();
  // let token=Cookies.get("token");
  Cookies.remove("token")
 

  const handleChange = (e) => {
    setCreateUser({
      ...createUser,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    signUp(createUser).unwrap()
      .then((payload) => {
        console.log('fulfilled', payload)
        if (payload.status) {
          Cookies.set('token',payload.data.token);
          // const token=JSON.parse(atob(payload.token.split('.')[1]));
          const token=JSON.parse(atob(payload.data.token.split('.')[1]));
          Cookies.set('userDetails',JSON.stringify(token));
          console.log(token);
          setCreateUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            age: 0,
            username: ''
          });
          window.location.reload();
          navigate("/")
        }
      })
      .catch((error) => console.error('rejected', error))
    console.log(
      createUser
    );

  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h6" variant="h6">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  id="firstName"
                  value={createUser.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  size="small"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  size="small"
                  value={createUser.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}  >
                <TextField
                  fullWidth
                  autoComplete="given-name"
                  name="username"
                  required
                  id="username"
                  placeholder="User Name"
                  value={createUser.username}
                  onChange={handleChange}
                  size="small"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}  >
                <TextField
                  fullWidth
                  autoComplete="given-name"
                  name="age"
                  required
                  id="age"
                  onChange={(e) => setCreateUser({ ...createUser, age: parseInt(e.target.value) })}
                  value={createUser.age}
                  placeholder="Age"
                  type='number'
                  size="small"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  size="small"
                  margin="dense"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={createUser.email}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  size="small"
                  margin="dense"
                  id="password"
                  onChange={handleChange}
                  value={createUser.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl placeholder
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 6 }} />
      </Container>

    </ThemeProvider>
  );
}