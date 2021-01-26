import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import RoomUser from './RoomUser';
import { useAuth } from '../../../hooks/useAuthContext';



const useStyles = makeStyles((theme) => ({
  self: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0rem 0.5rem 1rem',
    transition: '0.2s ease-in-out',
    background: '#F7F7F7',
  },
  
  text: {
    fontFamily: 'montserrat',
  },
  
  name: {
    fontWeight: 700,
    fontSize: '16pt',
    color: '#FF5A5F'
  },

  title: {
    padding: '0.5rem 0rem 0.5rem 1rem',
    fontSize: '20pt',
    color: '#ACABAB',
  },

  program: {
    color: '#ACABAB',
  }
}));

interface Props {
  users: User[]
}

export default function RoomUsers(props: Props) {

  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <div>
      <Typography className={`${classes.text} ${classes.title}`}>Participants</Typography>
      <div className={classes.self}>
        <Typography className={`${classes.text} ${classes.name}`}>{currentUser.firstName} {currentUser.lastName}</Typography>
        <Typography className={`${classes.text} ${classes.program}`}>{currentUser.program} Engineering</Typography>
      </div>
      {props.users.map(user => {
        return (
          <RoomUser user={user} />
        )
      })}
    </div>
  )
}
