import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem 0rem 0.5rem 0rem'
  },

  text: {
    fontFamily: 'montserrat'
  },

  name: {
    fontWeight: 700,
    fontSize: '16pt',
    color: '#FF5A5F'
  },

  program: {
    color: '#ACABAB'
  }

}));

interface Props {
  user: User
}

export default function RoomUser(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={`${classes.text} ${classes.name}`}>{props.user.firstName} {props.user.lastName}</Typography>
      <Typography className={`${classes.text} ${classes.program}`}>{props.user.program} Engineering</Typography>
    </div>
  )
}
