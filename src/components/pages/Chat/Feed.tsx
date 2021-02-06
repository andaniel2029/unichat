// Components and Interfaces
import MessageItem from './MessageItem';
import { Message } from './Chat';

// Contexts and Hooks
import { useAuth } from '../../../hooks/useAuthContext';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
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

  text: {
    fontFamily: 'halcom'
  },

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

// Interfaces
interface Props {
  messages: Message[];
  userTypingMessage: string;
  updateMessage: string;
  showUpdateMessage: boolean;
  room: string | string[] | null;
}

export default function Feed(props: Props) {

  // Styles
  const classes = useStyles();

  // Context variables
  const { currentUser } = useAuth();

  // console.log('feed is rendering');

  return (
    <div className={classes.root}>
      {props.showUpdateMessage && <div className={classes.alertContainer}>
        <Typography className={`${classes.text} ${classes.alertText}`}>{props.updateMessage}</Typography>
      </div>}
      {props.messages.map((message, index) => {
        const lastMessage = props.messages.length - 1 === index;
        return (
          <MessageItem
            key={message.id}
            index={index}
            room={props.room}
            lastMessage={lastMessage}
            message={message}
            fromMe={message.sender_id === currentUser.user.uid}
            />
          )
      })}
      <div className={classes.typingMessageContainer}>
        <Typography className={`${classes.text} ${classes.typingMessageText}`}>{props.userTypingMessage}</Typography>
      </div>
    </div>
  )
}
