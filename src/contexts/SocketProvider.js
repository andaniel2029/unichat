import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuthContext';

const SocketContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
console.log(ENDPOINT);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {

  const [socket, setSocket] = useState();
  const { currentUser } = useAuth();
  console.log('from socket', currentUser);
  
  useEffect(() => {
    
    if(currentUser.user) {
      const id = currentUser.user.uid;
      console.log('the id', id);
      const newSocket = io(ENDPOINT, 
        { query: { id } });
        setSocket(newSocket);
      }

      return () => {
      if(!socket) return;
      socket.off();
    }
  }, [currentUser.user]);

  console.log(socket);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
