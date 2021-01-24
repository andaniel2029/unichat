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

  main: {
    display: 'flex',
    width: '85%',
    height: '700px',
    justifyContent: 'space-between',
    border: '1px solid blue'
  },

  usersFeedContainer: {
    width: '80%',
    display: 'flex',
    border: '1px solid green'
  },

  users: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    padding: '10px',
    background: '#F2F2F2',
    border: '1px solid red'
  },

  feed: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
  },

  otherRooms: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    alignItems: 'center',
    border: '2px solid black'
  }

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
    socket.emit('join-room', { room, currentUser }, (users: any) => {
      setUsersInRoom(users);
    });

    return () => {
      socket.emit('leave-room', { currentUser }, () => {
      });
      socket.off();
    };

  }, []);


  useEffect(() => {
    socket.on('update-users', (roomData: any) => {
      console.log('here roomData', roomData.message);
      setUsersInRoom(roomData.users);
    })
  }, []);

  return (
    <Grid container className={classes.root}>
      <Header title={room}/>
      <Link to='/'>
        <Button variant="outlined">Home</Button>
      </Link>
      <div className={classes.main}>
        <div className={classes.usersFeedContainer}>
          <div className={classes.users}>
            <RoomUsers users={usersInRoom}/>
          </div>
          <div className={classes.feed}>
            <p>Feed</p>
          </div>
        </div>
        <div className={classes.otherRooms}>
          <p>Other Rooms</p>
        </div>
      </div>
    </Grid>
  )
}
