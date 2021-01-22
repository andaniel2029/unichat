import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useAuth } from '../hooks/useAuthContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import queryString from 'query-string';

export default function Chat({ location }: RouteComponentProps) {

  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const { room } = queryString.parse(location.search);
  console.log(room);
  // console.log('the socket from the chat', socket);

  useEffect(() => {
    if(!socket) return;
    console.log('going to emit the message event');
    socket.emit('join-room', { room, currentUser }, () => {});

    return () => {
      socket.emit('leave-room');
      socket.off();
    };

  }, []);


  return (
    <div>
      <Typography>Chat Page</Typography>
      <Link to='/'>
        <Button variant="outlined">Home</Button>
      </Link>
    </div>
  )
}
