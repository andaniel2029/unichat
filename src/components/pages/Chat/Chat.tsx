import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../contexts/SocketProvider';
import { useAuth } from '../../../hooks/useAuthContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import RoomUsers from './RoomUsers';
import Feed from './Feed';
import Input from './Input';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  main: {
    display: 'flex',
    width: '85%',
    height: '550px',
    justifyContent: 'space-between',
  },

  usersFeedContainer: {
    width: '80%',
    display: 'flex',
    borderRadius: '20px',
    boxShadow: "1px 8px 15px 2px #EDEDED",
  },

  users: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    borderRadius: '20px 0px 0px 20px',
    background: '#F2F2F2',
  },

  feedInput: {
    width: '70%',
  },

  otherRooms: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    alignItems: 'center',
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
  const { room, id } = queryString.parse(location.search);
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
          <div className={classes.feedInput}>
            <Feed />
            <Input />
          </div>
        </div>
        <div className={classes.otherRooms}>
          <p>Other Rooms</p>
        </div>
      </div>
    </Grid>
  )
}
