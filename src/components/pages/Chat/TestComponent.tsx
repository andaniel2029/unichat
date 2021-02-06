// React
import React, { useState, useEffect, useCallback } from 'react';

// Contexts and Hooks
import { useSocket } from '../../../contexts/SocketProvider';
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  typingMessageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: '15px',
    width: '100%',
    position: 'absolute',
    paddingBottom: '5px',
    bottom: '0px'
  },

  typingMessageText: {
    fontSize: '10pt',
    color: '#555555',
    paddingLeft: '0.7rem'
  },

  text: {
    fontFamily: 'halcom'
  }
}));

// Interfaces
interface Props {
  room: string | string[] | null;
}

interface typingUser {
  enter: boolean;
  firstName: string;
  lastName: string;
}

export default function TestComponent(props: Props) {

  // Styles
  const classes = useStyles();

  // Context variables
  const { socket } = useSocket();
  const { currentUser } = useAuth();

  const [userTypingMessage, setUserTypingMessage] = useState('');

  let timeout:any;
  const userTyping = useCallback((key:string) => {
    socket.emit('user-typing', 
      { 
        enter: key === 'Enter',
        room: props.room, 
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName 
      }
    );
  }, [currentUser, socket]);

  useEffect(() => {
    if(!socket) return;

    // Event listener for typing events to update UI with user who is typing
    socket.on('show-typing', (user: typingUser) => {

      // Timeout used to clear typingMessage after 2 seconds of no typing
      clearTimeout(timeout);

      // user.enter is a boolean representing if the enter key was pressed
      if(user.enter) {
        setUserTypingMessage('');
      } else {
        setUserTypingMessage(`${user.firstName} ${user.lastName} is typing`);
        timeout = setTimeout(() => {
          setUserTypingMessage('');
        }, 2000);
      }
    });
  }, [socket]);

  return (
    <div className={classes.typingMessageContainer}>
      <Typography className={`${classes.text} ${classes.typingMessageText}`}>{userTypingMessage}</Typography>
    </div>
  )
}
