import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketProvider';

export default function Chat() {

  const { socket } = useSocket();
  console.log('the socket from the chat', socket);

  useEffect(() => {
    if(!socket) return;
    socket.emit('sendMessage', ('hello there'))
  })


  return (
    <div>
      Chat Page    
    </div>
  )
}
