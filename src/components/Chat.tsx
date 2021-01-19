import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { useAuth } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export default function Chat() {

  const { socket } = useSocket();
  const { currentUser } = useAuth();
  console.log('the socket from the chat', socket);

  useEffect(() => {
    if(!socket) return;
    socket.emit('sendMessage', ('hello there'));

    return () => socket.off();
  }, [socket]);


  return (
    <div>
      <Typography>Chat Page</Typography>
      <Link to='/'>
        <Button variant="outlined">Home</Button>
      </Link>
    </div>
  )
}
