import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from "../lib/Axios"
import { useEffect, useState } from 'react';
import Title from './Title';
import Divider from '@mui/material/Divider';

export default function ListMatches() {

    const [match, setMatch] = useState([])

    useEffect(() => {
     const getMatch = async () => {
        let response = await Axios.get('/users/getMatches')
          let match = response.data.foundUser.savedMatch
          console.log(response.data.foundUser.savedMatch);

        setMatch(match)
      };
      getMatch()
    }, [])
    
    
   console.log(match);

  return (
    <React.Fragment>
      <Title>Messages</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{fontFamily: 'copperplate'}} >Name</TableCell>
            <TableCell sx={{fontFamily: 'copperplate'}} >Recent Messages</TableCell>
          </TableRow>
        </TableHead>
        <Divider orientation="vertical" flexItem />
        <TableBody>
        
        {/* <TableCell>{user.name}</TableCell> */}
          {match.map((e) => (
            <TableRow key={e.id}>
                <TableCell>
              <Avatar alt="" variant="rounded" sx={{ width: 100, height: 100 }} src={e.url} />
              </TableCell>
              <TableCell sx={{fontFamily: 'Monaco',}} >{e.name}</TableCell>
              <TableCell sx={{fontFamily: 'monospace'}} >{e.text.slice(0, 100)}...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}