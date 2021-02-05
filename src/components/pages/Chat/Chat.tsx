// React
import React, { useEffect, useState, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Components
import Header from './Header';
import OtherRooms from './OtherRooms';
import RoomUsers from './RoomUsers';
import Feed from './Feed';
import Input from './Input';

// Contexts and Hooks
import { useSocket } from '../../../contexts/SocketProvider';
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Other libraries
import axios from 'axios';
import queryString from 'query-string';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexFlow: 'column',
    height: '94vh',
  },

  chatRoomsContainer: {
    display: 'flex',
    height: '85%',
    justifyContent: 'space-between',
    animation: '$fadeIn 1.5s ease-in-out',
  },
  
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  usersFeedContainer: {
    display: 'flex',
    height: '100%',
    borderRight: '1px solid #EDEDED'
  },

  usersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    background: '#F2F2F2',
  },

  feedInputContainer: {
    width: '70%',
  },

  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },
}));

// Interfaces
export interface User {
  user: any,
  firstName: string;
  lastName: string;
  program: string;
}

export interface Message {
  id: number;
  course_id: number;
  sender_id: string;
  body: string;
  firstName: string;
  lastName: string;
  is_edited: boolean;
  created_at: string;
}

interface UpdatedRoomData {
  message: string;
  users: User[];
}

export default function Chat({ location }: RouteComponentProps) {

  // Styles
  const classes = useStyles();

  // Context variables
  const { socket } = useSocket();
  const { currentUser } = useAuth();

  // URL Parameters
  const { room, room_id } = queryString.parse(location.search);

  // State
  const [usersInRoom, setUsersInRoom] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [userTypingMessage, setUserTypingMessage] = useState('');
  
  // Retrieving messages in current conversation from API
  useEffect(() => {
    axios.get(`/api/messages/${room_id}`).then((res:any) => {
      setMessages(res.data);
    });

    // Cleanup to prevent stale messages state when moving between conversations
    return setMessages([]);
  }, [room_id]);

  useEffect(() => {
    if(!socket) return;

    // Notifying other clients in room when currentUser joins said room
    socket.emit('join-room', { room, currentUser }, (users: User[] = []) => {
      setUsersInRoom(users.filter((u: User) => u.user.uid !== currentUser.user.uid));
    });

    // When a user closes browser tab, they must be removed from the room on other clients
    window.addEventListener('unload', () => {
      socket.emit('leave-room', { currentUser });
    });

    return () => {
      // Notifying other users in room when currentUser leaves said room
      socket.emit('leave-room', { currentUser }, () => {
      });
      socket.off();
    };

  }, [socket, room_id]);

  useEffect(() => {
    if(!socket) return;

    // Event listener responsible for updating the UI when users leave/join
    socket.on('update-users', (data: UpdatedRoomData) => {
      setUpdateMessage(data.message);
      setShowUpdateMessage(true);
      setTimeout(() => {
        setShowUpdateMessage(false);
      }, 4000);
      setUsersInRoom(data.users.filter((u:User) => u.user.uid !== currentUser.user.uid));
    });

    socket.on('message', (message:Message) => {
      setMessages((prev) => [...prev, message]);
    })
  }, [socket, room_id]);


  let timeout:any;
  const userTyping = function(key:string) {
    socket.emit('user-typing', 
      { 
        enter: key === 'Enter',
        room, 
        firstName: currentUser.firstName, 
        lastName: currentUser.lastName 
      }
    );
  }

  useEffect(() => {
    if(!socket) return;
    socket.on('show-typing', (typingUser:any) => {

      clearTimeout(timeout);
      if(typingUser.enter) {
        setUserTypingMessage('');
      } else {
        setUserTypingMessage(`${typingUser.firstName} ${typingUser.lastName} is typing`);
        timeout = setTimeout(() => {
          setUserTypingMessage('');
        }, 2000);
      }
    });

  }, [socket, room_id]);

  const sendMessage = function(e: FormEvent, message:string) {
    e.preventDefault();

    if(message) {
      socket.emit('send-message', { room_id, room, message, currentUser });
    }
  }

  return (
    <Grid container className={classes.root}>
      <Header title={room}/>
      <Grid container className={classes.chatRoomsContainer}>
        <Grid item xs={12} md={10} className={classes.chatContainer}>
          <div className={classes.usersFeedContainer}>
            <div className={classes.usersContainer}>
              <RoomUsers users={usersInRoom}/>
            </div>
            <div className={classes.feedInputContainer}>
              <Feed
                room={room}
                messages={messages} 
                updateMessage={updateMessage}
                showUpdateMessage={showUpdateMessage}
                userTypingMessage={userTypingMessage}
              />
              <Input sendMessage={sendMessage} userTyping={userTyping}/>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <OtherRooms />
        </Grid>
      </Grid>
    </Grid>
  )
}
