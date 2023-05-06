import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Title from './Title';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import Axios from "../lib/Axios"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getAcct, updateAcct } from '../Slices/userSlice'

function preventDefault(event) {
  event.preventDefault();
}

export default function AccountList() {
    const dispatch = useDispatch();
    const acctData = useSelector(state => state.user)
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [pwdMatch, setPwdMatch] = useState({
        error: false,
        message: ''
    });
    useEffect(() => {
        dispatch(getAcct())
       }, [acctData])
//  
//

 console.log(acctData);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        let userObj = {
          name: data.get('name') ? data.get('name') : acctData.name,
          email: data.get('email') ? data.get('email') : acctData.email
        };
    // let update = await Axios.post('/users/updateUser', userObj);
    //     console.log(update)
    //     console.log(userObj);

    data.get('password') !== data.get('password1') ?
      setPwdMatch({
        error: true,
        message: "Passwords do not match"
      })
      :
      setPwdMatch({
        error: false,
        message: ''
      })

    //   (userObj.password === data.get('password1')) 
    //   && 
    
      dispatch(updateAcct(userObj))
      console.log(userObj);

      };
      console.log(acctData);

  return (
    <Container component="main" maxWidth="xs">
        <Title>Account Settings</Title>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Typography>Current Name: {acctData.name}</Typography>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Enter new name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <Typography>Current Email: {acctData.email}</Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Enter new email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <Typography>Update Password?</Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter new password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Verify new password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  error={pwdMatch.error}
                  helperText={pwdMatch.message}
                />
              </Grid>
            </Grid>
            <Button  type="submit"
              fullWidth variant="contained"
              sx={{ mt: 3, mb: 2 }}>Submit Changes</Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
    </Container>
  );
}