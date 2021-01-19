import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
console.log(ENDPOINT);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(ENDPOINT);

    setSocket(newSocket);

    return () => {
      if(!socket) return;
      socket.off();
    }
  }, []);

  console.log(socket);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
