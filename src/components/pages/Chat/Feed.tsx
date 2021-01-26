import { Typography } from '@material-ui/core';
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
    justifyContent: 'flex-end',
    height: '90%',
    padding: '0rem 1rem 0rem 1rem',
    overflow: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

}));

interface Props {
  messages: Message[]
}

export default function Feed(props: Props) {

  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div className={classes.root}>
      {props.messages.map((message:any) => {
        return (
          <MessageItem 
            key={message.id} 
            message={message}
            fromMe={message.id === currentUser.user.uid}
            />
          )
      })}
    </div>
  )
}
