import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import Message from './Message';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%'
  },

}));

interface Props {
  messages: any
}

export default function Feed(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.messages.map((message:any) => {
        return <Message key={message} message={message}/>
      })}
    </div>
  )
}
