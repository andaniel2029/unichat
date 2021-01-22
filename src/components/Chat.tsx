import React, { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useAuth } from '../hooks/useAuthContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import queryString from 'query-string';

interface User {
  user: Object,
  firstName: string,
  lastName: string,
  program: string
}


export default function Chat({ location }: RouteComponentProps) {

  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const { room } = queryString.parse(location.search);
  const [usersInRoom, setUsersInRoom] = useState([]);
  console.log(room);

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
    <div>
      <Typography>Chat Page</Typography>
      <Link to='/'>
        <Button variant="outlined">Home</Button>
      </Link>
      {usersInRoom.map((user:User) => {
        return (
          <Typography>{user.firstName}</Typography>
        )
      })}
    </div>
  )
}
