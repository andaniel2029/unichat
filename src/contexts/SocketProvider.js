// React
import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { useAuth } from '../hooks/useAuthContext';

// Socket IO
import io from 'socket.io-client';

const SocketContext = React.createContext();

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {

  const [socket, setSocket] = useState();
  const { currentUser } = useAuth();
  
  useEffect(() => {
    
    if(currentUser.user) {
      const id = currentUser.user.uid;
      const newSocket = io(ENDPOINT, 
        { query: { id } });
        setSocket(newSocket);
      }

      return () => {
      if(!socket) return;
      socket.off();
    }
  }, [currentUser.user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
