import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../contexts/SocketProvider';
import { useAuth } from '../../../hooks/useAuthContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import RoomUsers from './RoomUsers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  chat: {
    display: 'flex',
    width: '80%',
    justifyContent: 'space-between',
    border: '1px solid blue'
  },

  users: {
    border: '1px solid red'
  },

}));

export interface User {
  user: any,
  firstName: string,
  lastName: string,
  program: string
}


export default function Chat({ location }: RouteComponentProps) {

  const classes = useStyles();

  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const { room } = queryString.parse(location.search);
  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    if(!socket) return;
    socket.emit('join-room', { room, currentUser }, () => {});

    return () => {
      socket.emit('leave-room', { currentUser }, () => {
      });
      socket.off();
    };

  }, []);


  useEffect(() => {
    socket.on('update-users', (usersInRoom:any) => {
      console.log('here', usersInRoom);
      setUsersInRoom(usersInRoom);
    })
  }, []);

  console.log(usersInRoom);

  return (
    <Grid container className={classes.root}>
      <Header title={room}/>
      <Link to='/'>
        <Button variant="outlined">Home</Button>
      </Link>
      <Grid container className={classes.chat}>
        <Grid item className={classes.users}>
          <RoomUsers users={usersInRoom}/>
        </Grid>
        <Grid item>
          <p>lol</p>
        </Grid>
      </Grid>
    </Grid>
  )
}
