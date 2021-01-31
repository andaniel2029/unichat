import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './Chat';
import MessageItem from './MessageItem';
import { useAuth } from '../../../hooks/useAuthContext';
import { Typography } from '@material-ui/core';
// import ScrollToBottom from 'react-scroll-to-bottom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '92%',
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    position: 'relative',
  },

  typingMessageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: '15px',
    width: '100%',
  },

  typingMessageText: {
    fontFamily: 'halcom',
    fontSize: '10pt',
    color: '#555555',
    paddingLeft: '0.7rem'
  },

  alertContainer: {
    width: '30%',
    height: '25px',
    borderRadius: '0px 0px 10px 10px',
    background: '#1AE060',
    textAlign: 'center',
    position: 'fixed',
    zIndex: 0,
    animation: '$fadeInOut 4s ease-in-out'

  },
  
  alertText: {
    fontFamily: 'halcom',
    color: 'white',
  },

  '@keyframes fadeInOut': {
    '0%': {
      transform: 'translateY(-25px)'
    },
    '10%': {
      transform: 'translateY(0px)'
    },
    '75%': {
      transform: 'translateY(0px)'
    },
    '100%': {
      transform: 'translateY(-25px)'

    }
  },

}));

interface Props {
  messages: Message[];
  userTypingMessage: string;
  updateMessage: string;
  showUpdateMessage: boolean;
}

export default function Feed(props: Props) {

  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div className={classes.root}>
      {props.showUpdateMessage && <div className={classes.alertContainer}>
        <Typography className={`${classes.alertText}`}>{props.updateMessage}</Typography>
      </div>}
      {props.messages.map((message, index) => {
        const lastMessage = props.messages.length - 1 === index;
        return (
          <MessageItem
            lastMessage={lastMessage}
            message={message}
            fromMe={message.sender_id === currentUser.user.uid}
            />
          )
      })}
      <div className={classes.typingMessageContainer}>
        <Typography className={classes.typingMessageText}>{props.userTypingMessage}</Typography>
      </div>
    </div>
  )
}
