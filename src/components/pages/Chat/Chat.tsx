import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../contexts/SocketProvider';
import { useAuth } from '../../../hooks/useAuthContext';
import { useAppData } from '../../../contexts/AppDataProvider';
import { RouteComponentProps } from 'react-router-dom';
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
import CourseItem from '../Home/CourseItem';

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
    animation: '$fadeIn 1.5s ease-in-out',
  },
  
  chat: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
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

  otherRoomsMain: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    marginLeft: '4rem',
    marginTop: '20px',
    alignItems: 'center',

  },

  otherRoomsTitleContainer: {
    height: '50px',
    position: 'fixed',
  },

  otherRoomsItemsContainer: {
    marginTop: '50px',
    borderRadius: '20px',
    boxShadow: "1px 8px 15px 2px #EDEDED",
    overflow: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  otherRoomsTitle: {
    fontFamily: 'montserrat',
    fontSize: '16pt',
    borderBottom: '2px solid #FF5A5F',
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
  },

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
  const { courses } = useAppData();
  const { room, room_id } = queryString.parse(location.search);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [userTypingMessage, setUserTypingMessage] = useState('');

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

  }, [socket, room_id]);


  useEffect(() => {
    axios.get(`/api/messages/${room_id}`).then((res:any) => {
      console.log('api was called');
      setMessages(res.data);
    })
  }, [room_id]);


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
  }, [socket, room_id]);



  let timeout:any;
  const userTyping = function(key:string) {
    if(key === 'Enter') {
      clearTimeout(timeout);
      setUserTypingMessage('');
    } else {
      socket.emit('user-typing', { room, firstName: currentUser.firstName, lastName: currentUser.lastName });
    }
  }

  useEffect(() => {
    socket.on('show-typing', (firstName:string, lastName:string) => {
      console.log(firstName, lastName);
    })

  }, [socket, room_id]);

  const sendMessage = function(e: FormEvent, message:string) {
    e.preventDefault();

    if(message) {
      socket.emit('send-message', { room_id, room, message, currentUser });
    }
  }

  console.log(courses);

  return (
    <Grid container className={classes.root}>
      <Header title={room}/>
      <div className={classes.main}>
        <div className={classes.chat}>
          <div className={classes.alertContainer}>
            {showUpdateMessage && <Typography className={`${classes.alertText}`}>{updateMessage}</Typography>}
          </div>
          <div className={classes.usersFeedContainer}>
            <div className={classes.users}>
              <RoomUsers users={usersInRoom}/>
            </div>
            <div className={classes.feedInput}>
              <Feed messages={messages} userTypingMessage={userTypingMessage}/>
              <Input sendMessage={sendMessage} userTyping={userTyping}/>
            </div>
          </div>
        </div>
        <div className={classes.otherRoomsMain}>
          <div className={classes.otherRoomsTitleContainer}>
            <Typography className={`${classes.otherRoomsTitle}`}>Other Rooms</Typography>
          </div>
          <div className={classes.otherRoomsItemsContainer}>
            {courses.map((course:any) => {
              return <CourseItem key={course.id} course={course} home={false} />
            })}
          </div>
        </div>
      </div>
    </Grid>
  )
}
