import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import PetsIcon from '@mui/icons-material/Pets';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../Slices/userSlice'
import { useNavigate } from 'react-router-dom';
import { validator } from '../lib/validator'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https:/www.darrielcodes.com/">
      www.darrielcodes.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate()

  const [pwdMatch, setPwdMatch] = useState({
    error: false,
    message: ''
  })
  const [isValid, setIsValid] = useState({
      name:{
        error: false,
        message: ''
      }, 
      email:{
        error: false,
        message: ''
      }, 
      password:{
        error: false,
        message: ''
      }, 
    });

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let userObj = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password')
    };

    userObj.password !== data.get('password1') ?
      setPwdMatch({
        error: true,
        message: "Passwords do not match"
      })
      :
      setPwdMatch({
        error: false,
        message: ''
      });
      
      const validObj = validator(userObj)
      let isErrors = false

      for (const key in validObj) {
        console.log(validObj);
        if (validObj[key].error) {
          isErrors = true
        }
      };
      
      isErrors ? setIsValid(validObj) 
      : 
      (userObj.password === data.get('password1')) 
      && dispatch(getUser(userObj))
    console.log(user);
   

  };
 
  

  console.log(user);
  return (
    <ThemeProvider theme={theme}>
       <AppBar position="relative">
        <Toolbar>
          <PetsIcon sx={{ mr: 2 }} />
          <Typography variant="h6"
            noWrap
            component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            woofter
          </Typography>
          </Toolbar>
          </AppBar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1093496184/photo/puppy-with-a-rose.jpg?s=612x612&w=0&k=20&c=rNvVzBGIMQttX2KSKpz2-o36nG1t4VxebfHrBVAN1HY=)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* {user.message} */}
          <Box component="form" noValidate onSubmit={
            handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  error={isValid.name.error}
                  helperText={isValid.name.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={isValid.email.error}
                  helperText={isValid.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={isValid.password.error}
                  helperText={isValid.password.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Confirm Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  error={pwdMatch.error}
                  helperText={pwdMatch.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}