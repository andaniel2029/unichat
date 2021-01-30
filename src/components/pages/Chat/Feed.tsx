import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './Chat';
import MessageItem from './MessageItem';
import { useAuth } from '../../../hooks/useAuthContext';
// import ScrollToBottom from 'react-scroll-to-bottom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%',
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  scroll: {
    height: '500px',
    overflow: 'scroll',
    overflowX: 'hidden'
  }

}));

interface Props {
  messages: Message[]
}

export default function Feed(props: Props) {

  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div className={classes.root}>
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
    </div>
  )
}
