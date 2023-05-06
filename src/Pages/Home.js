import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import useGetDog from '../Hooks/useDogAPI';
import useClickHook from "../Hooks/useClickHook";
import { addNewMatch } from "../Slices/userSlice";
import { authFailure, authLogout, authSuccess } from '../Slices/authSlice';
import {checkAuthToken} from '../lib/checkAuthToken'
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://darrielcodes.com/">
      darrielcodes.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
   // const auth = useSelector( state => state.auth.isAuth )
    // const url = useSelector(state => state.dog.message);

    const getDog = useGetDog()
    const newMatch = useClickHook(getDog)
   
    const [match, setMatch] = useState({})
   
    // func to call auth on load
    // let authy = checkAuthToken()
    // useEffect(() => {
    //   authy ? dispatch(authSuccess())
    //   :
    //   dispatch(authFailure())
    // }, [])

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
      
    // func to fetch and set new data for match
    const handleClick = async () => {
      let newMatch = {
        name: '', 
        text: '', 
        url: ''
      }
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(json => newMatch.url = json.message)

      await fetch('https://fakerapi.it/api/v1/custom?_quantity=1&customfield1=name&customfield2=text')
      .then(response => response.json())
      .then(json => newMatch = {
        name: json.data[0].customfield1,
        text: json.data[0].customfield2,
        url: newMatch.url
      })
      console.log(newMatch)
      setMatch({newMatch})
    }
    // call func to allow data to load on refresh
    useEffect(() => {
      handleClick()
    }, [])
  
  console.log(match.newMatch);

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PetsIcon sx={{ mr: 2 }} />
          <Typography variant="h6"
            noWrap
            component="a"
            href="/"
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
          <Button variant='contained' sx={{fontFamily: 'monospace'}} onClick={() => {navigate('/dashboard')}}>Dashboard</Button>
          <Button variant='contained' sx={{fontFamily: 'monospace'}} onClick={() => {
            dispatch(authLogout())
            navigate('/signin')
          }
          }>Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
       <Grid 
  direction="column"
  justifyContent="center"
  alignItems="center"
  sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
     {/* <Container sx={{ py: 8 }} maxWidth="md"> */}
          {/* End hero unit */}
      <Card sx={{ maxWidth: 345 }} >
    
      <CardMedia
        component="img"
        height="240"
        sx={{ width: 345 }}
        image={match.newMatch !== undefined ? match.newMatch.url : getDog.url}
        alt="Random dog photo"
      />
      <CardContent>
      <Typography gutterBottom variant="h4" >
          {match.newMatch !== undefined ? match.newMatch.name : getDog.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <Typography sx={{fontFamily: 'monospace'}}>
            About Me
          </Typography>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{fontFamily: 'monospace'}} paragraph>
          {match.newMatch !== undefined ? match.newMatch.text : getDog.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        {/* </Container> */}

        
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              sx={{fontFamily: 'monospace'}}
            >
              woof woof?
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            <Button sx={{fontFamily: 'monospace'}} onClick={() => {
                handleClick()

            }} variant="outlined" color="error">Bark</Button>
              <Button sx={{fontFamily: 'monospace'}} onClick={(e) => {
                //sending match data to post
                  dispatch(addNewMatch(match.newMatch))

                  newMatch.onClickHandler(e, match.newMatch)
                  alert('Match saved successfully!')
                  handleClick()
              }} variant="contained">Sniff</Button>
            </Stack>
          </Container>
          </Grid>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper'}} component="footer">
        
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}