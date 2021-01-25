import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({
  root: {
  },

}));

interface Props {
  message: any
}

export default function Message(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.message}
    </div>
  )
}
