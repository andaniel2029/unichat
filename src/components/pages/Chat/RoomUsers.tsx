import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import RoomUser from './RoomUser';



const useStyles = makeStyles((theme) => ({
  root: {

  },
  
  text: {
    fontFamily: 'montserrat',
  },

  title: {
    padding: '0.5rem',
    fontSize: '20pt',
    color: '#ACABAB',
  }



}));

interface Props {
  users: User[]
}

export default function RoomUsers(props: Props) {

  const classes = useStyles();

  return (
    <div>
      <Typography className={`${classes.text} ${classes.title}`}>Participants</Typography>
      {props.users.map(user => {
        return (
          <RoomUser user={user} />
        )
      })}
    </div>
  )
}
