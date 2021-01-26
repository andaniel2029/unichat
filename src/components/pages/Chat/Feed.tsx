import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './Chat';
import MessageItem from './MessageItem';
import { useAuth } from '../../../hooks/useAuthContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%'
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
            key={message} 
            message={message}
            fromMe={message.id === currentUser.user.uid}
            />
          )
      })}
    </div>
  )
}
