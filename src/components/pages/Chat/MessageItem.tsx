import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './Chat';

interface StyleProps {
  fromMe: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    border: props => props.fromMe ? '1px solid red' : 'none'
  },

}));

interface Props {
  message: Message,
  fromMe: boolean
}

export default function MessageItem(props: Props) {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {props.message.firstName}
    </div>
  )
}
