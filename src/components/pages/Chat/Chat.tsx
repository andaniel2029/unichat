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
import { FormEvent } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  main: {
    display: 'flex',
    width: '85%',
    justifyContent: 'space-between',
    // animation: '$fadeIn 1.5s ease-in-out',
  },
  
  chat: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    // border: '1px solid red'
  },

  usersFeedContainer: {
    display: 'flex',
    height: '550px',
    borderRadius: '20px',
    boxShadow: "1px 8px 15px 2px #EDEDED",

  },

  alertContainer: {
    marginLeft: '30%',
    height: '30px'
  },

  alertText: {
    fontFamily: 'halcom',
    color: '#FF5A5F',
    animation: '$fadeInOut 2s ease-in-out'
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
  },

  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    }
  },

  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0,
    },
    '25%': {
      opacity: 1,
    },
    '75%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    }
  }

}));

export interface User {
  user: any,
  firstName: string;
  lastName: string;
  program: string;
}

export interface Message {
  id?: number;
  course_id: string;
  sender_id: string;
  body: string;
  firstName: string;
  lastName: string;
  is_edited: boolean;
}

export default function Chat({ location }: RouteComponentProps) {

  const classes = useStyles();

  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const { room, room_id } = queryString.parse(location.search);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  useEffect(() => {
    if(!socket) return;
    socket.emit('join-room', { room, currentUser }, (users: any) => {
      setUsersInRoom(users.filter((u: User) => u.user.uid !== currentUser.user.uid));
    });

    return () => {
      socket.emit('leave-room', { currentUser }, () => {
      });
      socket.off();
    };

  }, [socket]);


  useEffect(() => {
    axios.get(`/api/messages/${room_id}`).then((res:any) => {
      setMessages(res.data);
    })
  }, []);


  useEffect(() => {
    if(!socket) return;
    socket.on('update-users', (roomData: any) => {
      console.log('here roomData', roomData.message);
      setUpdateMessage(roomData.message);
      setShowUpdateMessage(true);
      setTimeout(() => {
        setShowUpdateMessage(false);
      }, 2000);
      setUsersInRoom(roomData.users.filter((u:User) => u.user.uid !== currentUser.user.uid));
    });

    socket.on('message', (message:Message) => {
      setMessages((prev) => [...prev, message]);
    })
  }, [socket]);

  const sendMessage = function(e: FormEvent, message:string) {
    e.preventDefault();

    if(message) {
      socket.emit('send-message', { room_id, room, message, currentUser });
    }
  }

  return (
    <Grid container className={classes.root}>
      <Header title={room}/>
      <div className={classes.main}>
        <div className={classes.chat}>
          <div className={classes.alertContainer}>
            {showUpdateMessage && <Typography className={classes.alertText}>{updateMessage}</Typography>}
          </div>
          <div className={classes.usersFeedContainer}>
            <div className={classes.users}>
              <RoomUsers users={usersInRoom}/>
            </div>
            <div className={classes.feedInput}>
              <Feed messages={messages}/>
              <Input sendMessage={sendMessage}/>
            </div>
          </div>
        </div>
        <div className={classes.otherRooms}>
          <p>Other Rooms</p>
        </div>
      </div>
    </Grid>
  )
}
